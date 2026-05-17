import SEO from "@/app/_components/seo/seo";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const ErrorScannerPage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "/api/upload", // URL endpoint untuk upload file
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        messageApi.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        messageApi.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <SEO
        title="Error Scanner - EPSON INDONESIA"
        description="Gunakan fitur Error Scanner untuk menganalisis masalah printer Anda dengan cepat. Upload foto error atau kode, dan dapatkan solusi instan dari AI kami."
        canonical="https://www.bukitaurumnsejahtera.co.id/servicespage/error-scanner"
      />

      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
        <div className="text-center xl:w-130 xl:mr-120 ">
          <h1 className="text-3xl font-bold mb-4">Scan Error Code Printer</h1>
          <h2 className="text-lg mb-6">Upload foto error pada layar printer, Ai akan membaca kode dan memberikan solusi terbaik</h2>
        </div>

        <div className="flex w-full max-w-6xl flex-col gap-6 xl:max-w-300 xl:flex-row xl:gap-10 2xl:max-w-350 h-full min-h-130">
          <div className="w-full xl:w-[55%] p-6 bg-white rounded-lg shadow-md min-h-130">
            <h3 className="text-lg font-semibold mb-4 text-blue-900">Upload Gambar Error</h3>
            {contextHolder}
            <Dragger {...props} className="custom-dragger" style={{ marginBottom: "20px" }} >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>

            <p className="text-sm text-blue-900 font-semibold">
              Contoh Gambar Yang di Dukung
            </p>

          </div>

          <div className="w-full xl:w-[45%] h-full p-6 bg-white rounded-lg shadow-md min-h-130">
            <h3 className="text-lg font-semibold mb-4 text-blue-900">Hasil Analisis</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4">
                <p className="text-xs text-gray-500">Detected Error Code</p>
                <p className="mt-1 text-2xl font-semibold text-blue-700">0x97</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col items-start gap-1">
                  <p className="text-xs text-gray-500">Confidence</p>
                  <p className="text-xl font-semibold text-green-600">98%</p>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-[98%] rounded-full bg-green-500" />
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-gray-200 p-4">
              <p className="text-sm font-semibold text-gray-700">Deskripsi Masalah</p>
              <p className="mt-2 text-sm text-gray-600">Paper feeding mechanism issue.</p>
            </div>

            <div className="mt-5 rounded-lg border border-gray-200 p-4">
              <p className="text-sm font-semibold text-gray-700">Rekomendasi Solusi</p>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                  Restart printer.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                  Bersihkan area paper feed.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                  Pastikan tidak ada kertas yang sobek atau tersangkut.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                  Jika masih terjadi, hubungi service center.
                </li>
              </ul>
            </div>

            <div className="mt-5 flex flex-col gap-3 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-gray-500">Estimasi Biaya Servis</p>
                <p className="mt-1 text-sm font-semibold text-blue-700">Rp150.000 - Rp300.000</p>
              </div>
              <button className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
                Cari Service Center Terdekat
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorScannerPage;
