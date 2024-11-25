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

        const backCamera = videoInputDevices.find(device => 
          device.label.toLowerCase().includes('back') || 
          device.label.toLowerCase().includes('environment')
        )

        const selectedDeviceId = backCamera?.deviceId || videoInputDevices[0].deviceId

        if (videoRef.current) {
          await codeReader.decodeFromVideoDevice(
            selectedDeviceId,
            videoRef.current,
            (result) => {
              if (result) {
                const scannedText = result.getText()
                const isbn = scannedText.replace(/[^0-9X]/gi, '')
                if (isbn.length === 10 || isbn.length === 13) {
                  onScan(isbn)
                }
              }
            }
          )
        } else {
          onError?.('Video element not found')
        }
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
