import { useEffect, useRef } from 'react'
import { BrowserMultiFormatReader } from '@zxing/library'

type BarcodeScannerProps = {
  onScan: (isbn: string) => void
  onError?: (error: string) => void
}

export default function BarcodeScanner({ onScan, onError }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader()

    const startScanning = async () => {
      try {
        const videoInputDevices = await codeReader.listVideoInputDevices()
        if (videoInputDevices.length === 0) {
          onError?.('No camera found')
          return
        }

        await codeReader.decodeFromVideoDevice(
          null,
          videoRef.current!,
          (result) => {
            if (result) {
              const scannedText = result.getText()
              // Most ISBN barcodes start with special characters - clean them up
              const isbn = scannedText.replace(/[^0-9X]/gi, '')
              if (isbn.length === 10 || isbn.length === 13) {
                onScan(isbn)
              }
            }
          }
        )
      } catch (err) {
        onError?.('Failed to access camera')
      }
    }

    startScanning()

    return () => {
      codeReader.reset()
    }
  }, [onScan, onError])

  return (
    <div className="w-full max-w-md mx-auto">
      <video
        ref={videoRef}
        className="w-full aspect-video rounded-lg border"
      />
    </div>
  )
}
