import { Avatar, Button, Card, Input, Typography } from 'antd'
import { SendOutlined } from '@ant-design/icons'

const chatHistory = [
  { title: 'Printer tidak bisa print', time: '10:30' },
  { title: 'Error code 0x07', time: 'Kemarin' },
  { title: 'Cara install driver Epson', time: '2 hari lalu' },
  { title: 'Kertas nyangkut', time: '3 hari lalu' },
]

const faqPopular = [
  'Printer tidak terdeteksi',
  'Cara reset printer Epson',
  'Cara scan dokumen',
  'Hasil print bergaris',
  'Printer offline',
]

const suggestions = [
  'Printer tidak bisa print',
  'Cara install driver Epson',
  'Kertas nyangkut di printer',
  'Hasil print bergaris',
  'Printer offline',
]

const quickReplies = ['Cara bersihkan paper feed', 'Error code lainnya', 'Hubungi CS']

const ChatBotPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fb] px-4 py-6 sm:px-6 lg:px-8 lg:py-8 2xl:px-10">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 lg:max-w-6xl lg:grid-cols-[240px_1fr] lg:gap-6 xl:max-w-7xl xl:grid-cols-[260px_1fr_260px] xl:gap-8">
        <Card
          className="order-2 lg:order-1"
          style={{
            borderRadius: 14,
            border: '1px solid #e6edf7',
            boxShadow: '0 8px 24px rgba(20, 38, 70, 0.06)',
          }}
          bodyStyle={{ padding: 16 }}
        >
          <div className="flex items-center justify-between">
            <Typography.Text style={{ color: '#1b2b4a', fontSize: 14, fontWeight: 700 }}>
              Riwayat Chat
            </Typography.Text>
          </div>
          <Button
            className="mt-3 w-full"
            style={{
              borderRadius: 10,
              fontWeight: 600,
              height: 34,
              padding: '0 14px',
              background: '#2f5dff',
              borderColor: '#2f5dff',
              color: '#ffffff',
            }}
          >
            Chat Baru
          </Button>

          <div className="mt-4">
            {chatHistory.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between"
                style={{ borderBottom: '1px solid #eef2f8', padding: '10px 0' }}
              >
                <Typography.Text className="text-xs font-semibold text-[#1f2f4d]">
                  {item.title}
                </Typography.Text>
                <Typography.Text style={{ color: '#6b7a99', fontSize: 12 }}>{item.time}</Typography.Text>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Typography.Text style={{ color: '#1b2b4a', fontSize: 13, fontWeight: 700 }}>
              FAQ Populer
            </Typography.Text>
            <ul className="cb-faq-list mt-2 list-disc pl-4">
              {faqPopular.map((item) => (
                <li key={item} style={{ color: '#1f2f4d', fontSize: 12, margin: '6px 0' }}>
                  {item}
                </li>
              ))}
            </ul>
            <Button
              className="mt-4 w-full"
              style={{
                borderRadius: 10,
                fontWeight: 600,
                height: 34,
                padding: '0 14px',
                borderColor: '#e3ebff',
                color: '#2f5dff',
                background: '#eef3ff',
              }}
            >
              Lihat Semua FAQ
            </Button>
          </div>
        </Card>

        <Card
          className="order-1 lg:order-2"
          style={{
            borderRadius: 14,
            border: '1px solid #e6edf7',
            boxShadow: '0 10px 26px rgba(20, 38, 70, 0.08)',
          }}
          bodyStyle={{ padding: 16 }}
        >
          <div className="flex items-center gap-3">
            <Avatar size={36} src="/favicon.ico" />
            <div>
              <Typography.Text style={{ color: '#1b2b4a', fontSize: 16, fontWeight: 700 }}>
                Epson AI Assistant
              </Typography.Text>
              <div style={{ color: '#6b7a99', fontSize: 12 }}>
                Tanyakan apa saja tentang printer Epson Anda
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <div
                className="inline-block max-w-[80%]"
                style={{
                  borderRadius: 12,
                  padding: '10px 12px',
                  fontSize: 13,
                  lineHeight: 1.5,
                  background: '#f2f6ff',
                  color: '#1f2f4d',
                }}
              >
                Halo!<br />
                Saya Epson AI Assistant.<br />
                Ada yang bisa saya bantu hari ini?
              </div>
              <div className="mt-1" style={{ color: '#6b7a99', fontSize: 12 }}>
                10:30
              </div>
            </div>

            <div className="text-right">
              <div
                className="inline-block max-w-[80%] text-left"
                style={{
                  borderRadius: 12,
                  padding: '10px 12px',
                  fontSize: 13,
                  lineHeight: 1.5,
                  background: '#2f5dff',
                  color: '#ffffff',
                }}
              >
                Printer saya muncul error 0x07, apa yang harus dilakukan?
              </div>
              <div className="mt-1" style={{ color: '#6b7a99', fontSize: 12 }}>
                10:31
              </div>
            </div>

            <div>
              <div
                className="inline-block max-w-[85%]"
                style={{
                  borderRadius: 12,
                  padding: '10px 12px',
                  fontSize: 13,
                  lineHeight: 1.5,
                  background: '#f2f6ff',
                  color: '#1f2f4d',
                }}
              >
                Error 0x07 biasanya terkait dengan masalah pada mekanisme paper feeding.
                Silakan ikuti langkah berikut:
                <ol className="mt-2 list-decimal pl-4">
                  <li>Matikan printer dan cabut kabel power.</li>
                  <li>Bersihkan area paper feed dari kotoran atau sobekan kertas.</li>
                  <li>Nyalakan kembali printer.</li>
                  <li>Jika masalah tetap, hubungi service center terdekat.</li>
                </ol>
              </div>
              <div className="mt-1" style={{ color: '#6b7a99', fontSize: 12 }}>
                10:32
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {quickReplies.map((item) => (
              <Button
                key={item}
                size="small"
                style={{
                  borderRadius: 999,
                  borderColor: '#d5e4ff',
                  color: '#2f5dff',
                  background: '#f4f7ff',
                  height: 30,
                  padding: '0 12px',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {item}
              </Button>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Input
              placeholder="Ketik pertanyaan Anda..."
              style={{ borderRadius: 12, borderColor: '#d9e2f2', height: 42 }}
            />
            <Button
              icon={<SendOutlined />}
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: '#2f5dff',
                borderColor: '#2f5dff',
                color: '#ffffff',
              }}
            />
          </div>
        </Card>

        <div className="order-3 space-y-6 lg:col-span-2 xl:col-span-1">
          <Card
            style={{
              borderRadius: 14,
              border: '1px solid #e6edf7',
              boxShadow: '0 8px 24px rgba(20, 38, 70, 0.06)',
            }}
            bodyStyle={{ padding: 16 }}
          >
            <Typography.Text style={{ color: '#1b2b4a', fontSize: 14, fontWeight: 700 }}>
              Saran Pertanyaan
            </Typography.Text>
            <div className="mt-3 flex flex-col gap-2">
              {suggestions.map((item) => (
                <Button
                  key={item}
                  block
                  style={{
                    borderRadius: 10,
                    fontWeight: 600,
                    height: 34,
                    padding: '0 14px',
                    borderColor: '#c8d6f2',
                    color: '#2f5dff',
                    background: '#ffffff',
                  }}
                >
                  {item}
                </Button>
              ))}
            </div>
          </Card>

          <Card
            style={{
              borderRadius: 14,
              border: '1px solid #e6edf7',
              boxShadow: '0 8px 24px rgba(20, 38, 70, 0.06)',
            }}
            bodyStyle={{ padding: 16 }}
          >
            <Typography.Text style={{ color: '#1b2b4a', fontSize: 14, fontWeight: 700 }}>
              Butuh Bantuan Lebih Lanjut?
            </Typography.Text>
            <Typography.Paragraph
              className="mt-2"
              style={{ marginBottom: 16, color: '#6b7a99', fontSize: 12 }}
            >
              Jika jawaban di atas belum membantu, hubungi kami melalui layanan berikut.
            </Typography.Paragraph>
            <Button
              className="w-full"
              style={{
                borderRadius: 10,
                fontWeight: 600,
                height: 34,
                padding: '0 14px',
                background: '#2f5dff',
                borderColor: '#2f5dff',
                color: '#ffffff',
              }}
            >
              Hubungi Customer Support
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ChatBotPage