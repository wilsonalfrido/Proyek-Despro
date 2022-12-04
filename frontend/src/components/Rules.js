import React from 'react'

const Rules = () => {
  return (
    <section>
        <div className="container mt-6">
            <div className="box card m-4">
                <h2 className="has-text-weight-semibold has-text-centered mb-3 is-size-4">Step 1: Book Your Devices</h2>
                <ol className='ml-2'>
                    <li>Pada menu Booking, pilih alat yang tersedia, dan klik pesan</li>
                    <li>Pilih waktu pinjam dan kembali, dan klik pesan sekarang</li>
                    <li>Jika ada kesalahan saat memilih alat, pilih abort. Abort hanya berlaku ketika alat belum diambil</li>
                    <li>Cek email untuk mendapatkan QR Code</li>
                </ol>
            </div>

            <div className="box card m-4">
                <h2 className="has-text-weight-semibold has-text-centered mb-3 is-size-4">Step 2: Take Your Device </h2>
                <ol className='ml-2'>
                    <li>Letakkan Gambar QRCode pada Scanner, hingga lemari terbuka</li>
                    <li>Ambil alat yang dipinjam dan scan ke QRCode hingga LED alat mati. Jika mengambil alat lain, akan ada alarm. Segera kembalikan ke tempat atau mendapatkan denda 5000</li>
                    <li>Tutup pintu kembali hingga lemari terkunci</li>
                    <li>Apabila memesan 2 atau lebih alat, lakukan poin 1-3 secara berurutan untuk tiap alat</li>
                </ol>
            </div>

            <div className="box card m-4">
                <h2 className="has-text-weight-semibold has-text-centered mb-3 is-size-4">Step 3: Return Your Device </h2>
                <ol className='ml-2'>
                    <li>Scan QRCode pada Scanner, hingga lemari terbuka</li>
                    <li>Letakkan alat ke tempat semula, hingga LED alat menyala</li>
                    <li>Tutup pintu kembali hingga lemari terkunci</li>
                    <li>Apabila memesan 2 atau lebih alat, lakukan poin 1-3 secara berurutan untuk tiap alat</li>
                    <li>Apabila pengembalian melebihi waktu pinjam, akan mendapatkan denda sebesar 5000</li>
                </ol>
            </div>
        </div>
    </section>
  )
}

export default Rules