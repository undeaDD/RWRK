import Foundation
import CoreNFC

class NFCManager: NSObject, NFCNDEFReaderSessionDelegate, ObservableObject {
    @Published var session: NFCNDEFReaderSession?
    
    override init() {
        super.init()
        session = NFCNDEFReaderSession(delegate: self, queue: .global(qos: .userInitiated), invalidateAfterFirstRead: false)
        session?.alertMessage = "Hold your iPhone near the NFC tag."
    }
    
    func handleNFCSpotlight(_ userActivity: NSUserActivity) {
        let records = userActivity.ndefMessagePayload.records
        for record: NFCNDEFPayload in records {
            print("info: \(record)")
        }
    }
    
    func startSession() {
        session?.begin()
    }
    
    func readerSession(_ session: NFCNDEFReaderSession, didDetect tags: [NFCNDEFTag]) {
        guard tags.count == 1 else {
            session.invalidate(errorMessage: "Can not write to more than one tag.")
            return
        }

        let currentTag = tags.first!
        
        session.connect(to: currentTag) { error in
            guard error == nil else {
                session.invalidate(errorMessage: "Could not connect to tag.")
                return
            }
            
            currentTag.queryNDEFStatus { status, capacity, error in
                guard error == nil else {
                    session.invalidate(errorMessage: "Could not query status of tag.")
                    return
                }
                        
                switch status {
                case .notSupported:
                    session.invalidate(errorMessage: "Tag is not supported.")
                case .readOnly:
                    session.invalidate(errorMessage: "Tag is only readable.")
                case .readWrite:
                    self.readerSession(session, writeTo: currentTag, writeUri: "https://rwrkstudio.com")
                default:
                    session.invalidate(errorMessage: "Unknown status of tag.")
                }
            }
        }
    }
    
    func readerSessionDidBecomeActive(_ session: NFCNDEFReaderSession) {
        print("active")
    }
    
    func readerSession(_ session: NFCNDEFReaderSession, didInvalidateWithError error: Error) {
        print(error.localizedDescription)
    }
    
    func readerSession(_ session: NFCNDEFReaderSession, didDetectNDEFs messages: [NFCNDEFMessage]) {
        if let tag = messages.first?.records.first {
            print(tag)
        }
    }
    
    func readerSession(_ session: NFCNDEFReaderSession, writeTo tag: NFCNDEFTag, writeUri uri: String) {
        guard !uri.isEmpty,
              let url = URL(string: uri),
              let payload = NFCNDEFPayload.wellKnownTypeURIPayload(url: url) else {
            session.invalidate(errorMessage: "Failed to write message.")
            return
        }
        
        tag.writeNDEF(NFCNDEFMessage(records: [payload])) { error in
            if let error {
                print(error.localizedDescription)
                session.invalidate(errorMessage: "Failed to write message.")
            } else {
                session.alertMessage = "Successfully configured tag."
                session.invalidate()
            }
        }
    }
}
