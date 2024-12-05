import { useState } from 'react'
import BarcodeScannerComponent from "react-qr-barcode-scanner"

interface BarcodeScannerProps {
  onScan: (isbn: string) => void
  onError?: (error: string) => void
}

export default function BarcodeScanner({ onScan, onError }: BarcodeScannerProps) {
  const [torchOn, setTorchOn] = useState(false)

  const handleUpdate = (err: any, result: any) => {
    if (err) {
      onError?.(err.message || 'Failed to scan')
      return
    }

    if (result) {
      const scannedText = result.getText()
      const isbn = scannedText.replace(/[^0-9X]/gi, '')
      if (isbn.length === 10 || isbn.length === 13) {
        onScan(isbn)
      }
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <BarcodeScannerComponent
          width="100%"
          height="auto"
          torch={torchOn}
          onUpdate={handleUpdate}
        />
        <button
          onClick={() => setTorchOn(!torchOn)}
          className="absolute bottom-4 right-4 px-3 py-1 bg-white/80 text-black rounded-md hover:bg-white/90 transition-colors"
        >
          {torchOn ? 'Turn Off Light' : 'Turn On Light'}
        </button>
      </div>
    </div>
  )
}
