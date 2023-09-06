import SwiftUI
import WebKit

struct HomeView: View {
    @EnvironmentObject private var nfcManager: NFCManager
    
    
    var body: some View {
        NavigationView {
            WebView()
                .navigationTitle("RWRK")
                .navigationBarTitleDisplayMode(.inline)
                .toolbar {
                    ToolbarItem(placement: .navigationBarTrailing) {
                        Button(action: {
                            nfcManager.startSession()
                        }, label: {
                            Image(systemName: "plus.viewfinder")
                                .imageScale(.large)
                                .tint(.red)
                        })
                    }
                }
        }
    }
}

struct WebView : UIViewRepresentable {
    func makeUIView(context: Context) -> WKWebView {
        let webView = WKWebView()
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.isScrollEnabled = false
        return webView
    }
    
    func updateUIView(_ webView: WKWebView, context: Context) {
        let url: URL = URL(string: "https://rwrkstudio.com/nft.html")!
        let request = URLRequest(url: url)
        webView.load(request)
    }
}
