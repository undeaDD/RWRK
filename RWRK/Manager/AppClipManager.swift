import SwiftUI
import StoreKit

class AppClipManager: NSObject, ObservableObject {
    func displayInstallationToast(_ view: some View) {
        if let scene = UIApplication.shared.delegate?.window??.windowScene {
            let config = SKOverlay.AppClipConfiguration(position: .bottomRaised)
            let overlay = SKOverlay(configuration: config)
            overlay.present(in: scene)
        }
    }
}
