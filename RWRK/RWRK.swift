import SwiftUI

@main
struct RWRK: App {

    @StateObject var nfcManager = NFCManager()
    @StateObject var appClipManager = AppClipManager()
    
    var body: some Scene {
        WindowGroup {
            HomeView()
                .background(.black)
                .preferredColorScheme(.dark)
                .environmentObject(nfcManager)
                .environmentObject(appClipManager)
                .onContinueUserActivity(NSUserActivityTypeBrowsingWeb, perform: handleSpotlight)
        }
    }
    
    func handleSpotlight(_ userActivity: NSUserActivity) {
        // universal link
        if let url = userActivity.webpageURL {
            print("url: \(url.absoluteString)")
        }
        
        // nfc tag data
        nfcManager.handleNFCSpotlight(userActivity)
    }
}
