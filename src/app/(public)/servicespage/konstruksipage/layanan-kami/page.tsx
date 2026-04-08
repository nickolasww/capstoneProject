import { Card } from "antd";
import {
  ToolOutlined,
  HomeOutlined,
  TeamOutlined,
  SolutionOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  BuildOutlined,
} from "@ant-design/icons";

const LayananKamiPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-10">
        <h1 className="text-5xl font-semibold mb-2">Layanan Kami</h1>
        <h2 className="text-md max-w-125 text-center">
          Kami menyediakan berbagai layanan konstruksi yang komprehensif untuk
          memenuhi kebutuhan proyek Anda
        </h2>
      </div>

      <div className="grid grid-flow-col grid-rows-2 gap-15 p-5 justify-center items-stretch">
        <Card
          hoverable
          style={{ width: 280 }}
          cover={
            <div
              style={{
                backgroundColor: "#16a34a",
                height: "170px",
                display: "flex",
                flexDirection: "column",
                padding: "20px 10px 10px 20px",
                gap: "30px",
              }}
            >
              <div className="bg-white/20 rounded-xl p-2 w-fit">
                <SolutionOutlined
                  style={{ fontSize: "32px", color: "white" }}
                />
              </div>
              <h1 className="text-white text-2xl">Perencanaan Konstruksi</h1>
            </div>
          }
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "300px", 
            }}
          >
            <p className="text-justify">
              Kami menyediakan layanan perencanaan konstruksi yang komprehensif,
              mulai dari desain awal hingga detail engineering. Tim ahli kami
              akan membantu mewujudkan visi proyek Anda dengan perencanaan yang
              matang dan efisien.
            </p>
            <ul>
              <li>
                <CheckCircleOutlined
                  style={{ color: "green", padding: "0px 5px 0px 0px" }}
                />{" "}
                Analisis Kelayakan
              </li>
              <li>
                <CheckCircleOutlined
                  style={{ color: "green", padding: "0px 5px 0px 0px" }}
                />{" "}
                Desain Arsitektur
              </li>
              <li>
                <CheckCircleOutlined
                  style={{ color: "green", padding: "0px 5px 0px 0px" }}
                />{" "}
                Perhitungan Struktur
              </li>
              <li>
                <CheckCircleOutlined
                  style={{ color: "green", padding: "0px 5px 0px 0px" }}
                />{" "}
                RAB & Time Schedule
              </li>
            </ul>
          </div>
        </Card>

        <Card
          hoverable
          style={{ width: 280 }}
          cover={
            <div
              style={{
                backgroundColor: "#16a34a",
                height: "170px",
                display: "flex",
                flexDirection: "column",
                padding: "20px 10px 10px 20px",
                gap: "30px",
              }}
            >
              <div className="bg-white/20 rounded-xl p-2 w-fit">
                <TeamOutlined style={{ fontSize: "32px", color: "white" }} />
              </div>

              <h1 className="text-white text-2xl">Perencanaan Konstruksi</h1>
            </div>
          }
        >
            <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "300px", 
            }}
          >
          <p className="text-justify">
            Manajemen proyek end-to-end yang mencakup perencanaan, koordinasi,
            dan pengendalian untuk memastikan proyek selesai sesuai target
            biaya, waktu, dan kualitas.
          </p>
          <ul>
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Project Planning
            </li>
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Resource Management
            </li>
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Cost Control
            </li>
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Risk Management
            </li>
          </ul>
          </div>
        </Card>

        <Card
          hoverable
          style={{ width: 280 }}
          cover={
            <div
              style={{
                backgroundColor: "#16a34a",
                height: "170px",
                display: "flex",
                flexDirection: "column",
                padding: "20px 10px 10px 20px",
                gap: "30px",
              }}
            >
              <div className="bg-white/20 rounded-xl p-2 w-fit">
                <HomeOutlined style={{ fontSize: "32px", color: "white" }} />
              </div>
              <h1 className="text-white text-2xl">Perencanaan Konstruksi</h1>
            </div>
          }
        >
            <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "300px", 
            }}
          >
          <p className="text-justify">
            Pelaksanaan pembangunan dengan standar kualitas tinggi dan tepat
            waktu. Kami menangani berbagai jenis proyek konstruksi dengan
            pengalaman dan keahlian yang terpercaya.
          </p>
          <ul className="mt-10">
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Konstruksi Gedung
            </li>
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Infrastruktur Jalan
            </li>
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Jembatan & Flyover
            </li>
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Renovasi Bangungan
            </li>
          </ul>
          </div>
        </Card>

        <Card
          hoverable
          style={{ width: 280 }}
          cover={
            <div
              style={{
                backgroundColor: "#16a34a",
                height: "170px",
                display: "flex",
                flexDirection: "column",
                padding: "20px 10px 10px 20px",
                gap: "30px",
              }}
            >
              <div className="bg-white/20 rounded-xl p-2 w-fit">
                <BuildOutlined style={{ fontSize: "32px", color: "white" }} />
              </div>
              <h1 className="text-white text-2xl">Perencanaan Konstruksi</h1>
            </div>
          }
        >
            <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "300px", 
            }}
          >
          <p className="text-justify">
            Konsultasi dan solusi teknis untuk berbagai permasalahan konstruksi.
            Tim engineer berpengalaman siap memberikan rekomendasi terbaik untuk
            proyek Anda.
          </p>
          <ul >
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Technical Advisory
            </li>
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Problem Solving
            </li>
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Value Engineering
            </li>
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Feasibility Study
            </li>
          </ul>
          </div>
        </Card>

        <Card
          hoverable
          style={{ width: 280 }}
          cover={
            <div
              style={{
                backgroundColor: "#16a34a",
                height: "170px",
                display: "flex",
                flexDirection: "column",
                padding: "20px 10px 10px 20px",
                gap: "30px",
              }}
            >
              <div className="bg-white/20 rounded-xl p-2 w-fit">
                <EyeOutlined style={{ fontSize: "32px", color: "white" }} />
              </div>
              <h1 className="text-white text-2xl">Perencanaan Konstruksi</h1>
            </div>
          }
        >
            <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "300px", 
            }}
          >
          <p className="text-justify">
            Layanan pengawasan proyek profesional untuk memastikan setiap
            tahapan konstruksi berjalan sesuai standar, spesifikasi, dan
            timeline yang telah ditetapkan.
          </p>
          <ul>
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Quality Control
            </li>
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Progress Mentoring
            </li>
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Safety Management
            </li>
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Documentation
            </li>
          </ul>
          </div>
        </Card>

        <Card
          hoverable
          style={{ width: 280 }}
          cover={
            <div
              style={{
                backgroundColor: "#16a34a",
                height: "170px",
                display: "flex",
                flexDirection: "column",
                padding: "20px 10px 10px 20px",
                gap: "30px",
              }}
            >
              <div className="bg-white/20 rounded-xl p-2 w-fit">
                <ToolOutlined style={{ fontSize: "32px", color: "white" }} />
              </div>
              <h1 className="text-white text-2xl">Perencanaan Konstruksi</h1>
            </div>
          }
        >
            <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "300px", 
            }}
          >
          <p className="text-justify">
            Layanan pemeliharaan dan perbaikan bangunan untuk menjaga kondisi
            optimal dan memperpanjang usia bangunan dengan perawatan yang tepat.
          </p>
          <ul >
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Preventive Maintenance
            </li>
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Building Repair
            </li>
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Retrofitting
            </li>
            <li>
              <CheckCircleOutlined
                style={{ color: "green", padding: "0px 5px 0px 0px" }}
              />{" "}
              Emergency Service
            </li>
          </ul>
          </div>
        </Card>
      </div>
    </>
  );
};

export default LayananKamiPage;
