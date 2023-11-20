import SwiftUI
import WebKit

struct HomeView: View {
    @EnvironmentObject private var nfcManager: NFCManager
    
    var body: some View {
        WebView()
            .background(Color("Background", bundle: .main))
            .navigationBarTitleDisplayMode(.inline)
            .navigationTitle("RWRK")
            .ignoresSafeArea()
        .safeAreaInset(edge: .bottom, spacing: 0) {
            VStack {
                Button(action: {
                    nfcManager.startSession()
                }) {
                    Text("Authenticate")
                        .frame(maxWidth: .infinity, minHeight: 38)
                }
                    .buttonStyle(.borderedProminent)
                    .foregroundColor(.black)
                    .tint(.white)
                    .padding()
            }
            .frame(width: UIScreen.main.bounds.width, height: 90)
            .edgesIgnoringSafeArea(.bottom)
            .background(.ultraThinMaterial)
        }
    }
}

struct WebView : UIViewRepresentable {
    func makeUIView(context: Context) -> WKWebView {
        let webView = WKWebView()
        webView.isOpaque = false
        webView.backgroundColor = UIColor(named: "Background")
        webView.scrollView.isScrollEnabled = true
        webView.customUserAgent = "RWRK iOS"
        
        let refreshControl = UIRefreshControl()
        refreshControl.backgroundColor = UIColor(named: "Background")
        refreshControl.tintColor = UIColor(named: "AccentColor")
        refreshControl.addAction(UIAction(handler: { _ in
            refreshControl.endRefreshing()
            reloadWebView(webView)
        }), for: .valueChanged)
        webView.scrollView.refreshControl = refreshControl
        webView.scrollView.backgroundColor = UIColor(named: "Background")
        return webView
    }
    
    func reloadWebView(_ webView: WKWebView) {
        let url: URL = URL(string: "https://rwrkstudio.com/nfc.html")!
        let request = URLRequest(url: url)
        webView.load(request)
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        reloadWebView(webView)
    }
}
