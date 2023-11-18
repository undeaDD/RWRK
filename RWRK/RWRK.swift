import SwiftUI

@main
struct RWRK: App {

    @StateObject var nfcManager = NFCManager()
    @StateObject var appClipManager = AppClipManager()
    
    init() {
        let coloredAppearance = UINavigationBarAppearance()
        coloredAppearance.configureWithDefaultBackground()
        coloredAppearance.titleTextAttributes = [.foregroundColor: UIColor.white]
        coloredAppearance.largeTitleTextAttributes = [.foregroundColor: UIColor.white]

        UINavigationBar.appearance().standardAppearance = coloredAppearance
        UINavigationBar.appearance().compactAppearance = coloredAppearance
        UINavigationBar.appearance().scrollEdgeAppearance = coloredAppearance
        UINavigationBar.appearance().tintColor = .white
    }
    
    var body: some Scene {
        WindowGroup {
            HomeView()
                .tint(Color("AccentColor", bundle: .main))
                .background(Color("Background", bundle: .main))
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
