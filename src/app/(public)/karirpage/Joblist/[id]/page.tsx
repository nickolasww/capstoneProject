'use client';

import { useMemo } from 'react';
import {
	ArrowLeftOutlined,
	EnvironmentOutlined,
	CalendarOutlined,
	ClockCircleOutlined,
	ShareAltOutlined,
	ApartmentOutlined,
	WalletOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import LogoBas from '@/assets/logo PT BAS.png';
import LoadingPage from '@/app/loading';
import { useQuery } from '@/app/_hooks/request/use-query';
import { getDetailJobPosition, getJobPositions } from '@/api/karir';

const COMPANY_NAME = 'Bukit Aurumn Sejahtera';
const COMPANY_DESCRIPTION = 'Perusahaan yang bergerak di area operasional dengan jenis pelaksanaan, pengangkutan, dan pembongkaran material konstruksi. PT Bukit Aurumn Sejahtera berfokus pada layanan operasional lapangan yang disiplin, aman, dan terukur.';
const COMPANY_ADDRESS = 'Jl. Urip Sumoharjo No.26, Kaliombo, Kec. Kota, Kota Kediri, Jawa Timur 64126';

const employmentTypeLabel: Record<string, string> = {
	full_time: 'Full Time',
	part_time: 'Part Time',
	contract: 'Kontrak',
	internship: 'Magang',
};

const formatDate = (dateString?: string) => {
	if (!dateString) {
		return '-';
	}

	return new Date(dateString).toLocaleDateString('id-ID', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
};

const parseTextBlocks = (value?: string) => {
	if (!value) {
		return [];
	}

	return value
		.split('\n')
		.map((item) => item.trim())
		.filter(Boolean)
		.map((item) => item.replace(/^\d+[.)]\s*/, '').replace(/^[\-*•]\s*/, '').trim());
};

const DetailSection = ({ title, items, fallback }: { title: string; items: string[]; fallback: string }) => {
	return (
		<section className="rounded-[28px] border border-[#D9E1D3] bg-white p-6 shadow-[0_16px_50px_rgba(32,56,24,0.08)] sm:p-8">
			<h2 className="text-xl font-semibold text-[#15210F]">{title}</h2>
			{items.length > 0 ? (
				<ol className="mt-5 space-y-3 pl-5 text-sm leading-7 text-[#4F5F47] marker:font-semibold marker:text-[#48892F] sm:text-base">
					{items.map((item, index) => (
						<li key={`${title}-${index}`}>{item}</li>
					))}
				</ol>
			) : (
				<p className="mt-5 text-sm leading-7 text-[#4F5F47] sm:text-base">{fallback}</p>
			)}
		</section>
	);
};

export default function JobPositionDetailPage() {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const slug = id || '';

	const {
		data: detailResponse,
		isLoading: isDetailLoading,
		isError: isDetailError,
	} = useQuery({
		queryKey: ['job-position-detail', slug],
		queryFn: () => getDetailJobPosition({ slug }),
		enabled: Boolean(slug),
	});

	const {
		data: jobsResponse,
		isLoading: isJobsLoading,
	} = useQuery({
		queryKey: ['job-positions-related'],
		queryFn: () => getJobPositions({ limit: 6 }),
	});

	const job = detailResponse?.job_positions;

	const descriptionItems = useMemo(() => parseTextBlocks(job?.description), [job?.description]);
	const requirementsItems = useMemo(() => parseTextBlocks(job?.requirements), [job?.requirements]);
	const responsibilitiesItems = useMemo(() => parseTextBlocks(job?.responsibilities), [job?.responsibilities]);

	const relatedJobs = useMemo(() => {
		const jobs = jobsResponse?.job_positions.list || [];

		return jobs
			.filter((item) => item.id !== job?.id && item.slug !== job?.slug)
			.slice(0, 2);
	}, [job?.id, job?.slug, jobsResponse?.job_positions.list]);

	const handleShare = async (targetSlug?: string) => {
		const path = targetSlug ? `/karirpage/Joblist/${targetSlug}` : window.location.pathname;
		const url = `${window.location.origin}${path}`;

		try {
			if (navigator.share) {
				await navigator.share({
					title: job?.title || 'Lowongan PT BAS',
					text: 'Lihat detail lowongan kerja ini.',
					url,
				});
				return;
			}

			await navigator.clipboard.writeText(url);
			window.alert('Tautan detail lowongan berhasil disalin.');
		} catch (error) {
			window.alert('Gagal membagikan tautan. Silakan coba lagi.');
		}
	};

	if (isDetailLoading) {
		return <LoadingPage />;
	}

	if (isDetailError || !job) {
		return (
			<section className="min-h-screen bg-[#F7F7F2] px-4 py-12 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-6xl rounded-[28px] border border-[#E3E7DE] bg-white p-8 text-center shadow-[0_16px_50px_rgba(32,56,24,0.08)]">
					<h1 className="text-2xl font-semibold text-[#15210F]">Detail lowongan tidak ditemukan</h1>
					<p className="mt-3 text-sm text-[#66725F] sm:text-base">
						Periksa kembali slug lowongan atau kembali ke daftar karir untuk memilih posisi lain.
					</p>
					<button
						onClick={() => navigate('/karirpage')}
						className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#48892F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3B7225]"
					>
						<ArrowLeftOutlined />
						Kembali ke daftar karir
					</button>
				</div>
			</section>
		);
	}

	return (
		<section className="min-h-screen bg-[linear-gradient(180deg,#FBFBF7_0%,#F3F5EE_100%)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
			<div className="mx-auto max-w-6xl">
				<button
					onClick={() => navigate('/karirpage')}
					className="inline-flex items-center gap-2 text-sm font-medium text-[#26341F] transition hover:text-[#48892F]"
				>
					<ArrowLeftOutlined />
					Kembali
				</button>

				<div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-[#7B8875]">
					<span>Lowongan</span>
					<span>/</span>
					<span className="font-semibold text-[#48892F]">Detail Pekerjaan</span>
				</div>

				<div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
					<div className="space-y-8">
						<div className="rounded-[30px] border border-[#DCE4D5] bg-white px-6 py-7 shadow-[0_20px_60px_rgba(34,58,24,0.08)] sm:px-8">
							<div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
								<div className="flex gap-4">
									<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#E6EDD9] bg-[#F7FAF2] p-2">
										<img src={LogoBas} alt="PT BAS Logo" className="h-full w-full object-contain" />
									</div>
									<div>
										<h1 className="text-2xl font-semibold text-[#15210F] sm:text-3xl">{job.title}</h1>
										<div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#66725F] sm:text-base">
											<span className="inline-flex items-center gap-2">
												<EnvironmentOutlined className="text-[#48892F]" />
												{job.location}
											</span>
											<span className="inline-flex items-center gap-2">
												<ApartmentOutlined className="text-[#48892F]" />
												{job.department || COMPANY_NAME}
											</span>
										</div>
									</div>
								</div>

								<div className="rounded-full border border-[#DCE4D5] bg-[#F7FAF2] px-4 py-2 text-sm font-semibold text-[#48892F]">
									{employmentTypeLabel[job.employment_type] || job.employment_type}
								</div>
							</div>

							<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
								<button
									onClick={() => navigate('/auth/login')}
									className="inline-flex items-center justify-center rounded-2xl bg-[#48892F] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#3B7225] sm:min-w-35"
								>
									Lamar
								</button>
								<button
									onClick={() => handleShare(job.slug || slug)}
									className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#DCE4D5] px-6 py-3 text-sm font-semibold text-[#26341F] transition hover:border-[#48892F] hover:text-[#48892F]"
								>
									<ShareAltOutlined />
									Bagikan
								</button>
							</div>

							<div className="mt-6 grid gap-3 border-t border-[#EDF1E8] pt-6 text-sm text-[#66725F] sm:grid-cols-3 sm:text-base">
								<div className="inline-flex items-center gap-2">
									<CalendarOutlined className="text-[#48892F]" />
									Diposting {formatDate(job.posted_at)}
								</div>
								<div className="inline-flex items-center gap-2">
									<ClockCircleOutlined className="text-[#48892F]" />
									Ditutup {formatDate(job.closed_at)}
								</div>
								<div className="inline-flex items-center gap-2">
									<WalletOutlined className="text-[#48892F]" />
									{job.salary || 'Kompensasi kompetitif'}
								</div>
							</div>
						</div>

						<DetailSection
							title="Deskripsi Pekerjaan"
							items={descriptionItems}
							fallback={job.description || 'Informasi deskripsi pekerjaan belum tersedia.'}
						/>

						<DetailSection
							title="Persyaratan"
							items={requirementsItems}
							fallback={job.requirements || 'Informasi persyaratan belum tersedia.'}
						/>

						<DetailSection
							title="Tanggung Jawab"
							items={responsibilitiesItems}
							fallback={job.responsibilities || 'Informasi tanggung jawab belum tersedia.'}
						/>
					</div>

					<aside className="space-y-6">
						<div className="rounded-[28px] border border-[#C8D2C1] bg-white p-6 shadow-[0_16px_50px_rgba(32,56,24,0.08)]">
							<h2 className="text-xl font-semibold text-[#15210F]">Tentang Perusahaan</h2>
							<div className="mt-5 rounded-2xl border border-[#DCE4D5] bg-[#F9FBF6] p-5 text-center">
								<h3 className="text-base font-semibold text-[#15210F]">{COMPANY_NAME}</h3>
								<p className="mt-4 text-sm leading-7 text-[#4F5F47]">{COMPANY_DESCRIPTION}</p>

								<div className="mt-6 border-t border-[#DCE4D5] pt-6">
									<h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#26341F]">Alamat Kantor</h4>
									<p className="mt-3 text-sm leading-7 text-[#4F5F47]">{COMPANY_ADDRESS}</p>
								</div>
							</div>
						</div>
					</aside>
				</div>

				<div className="mt-16">
					<div className="flex items-center justify-between gap-4">
						<div>
							<h2 className="text-2xl font-semibold text-[#15210F]">Pekerjaan Lainnya</h2>
							<p className="mt-2 text-sm text-[#66725F]">Posisi lain yang masih tersedia di PT BAS.</p>
						</div>
						<button
							onClick={() => navigate('/karirpage')}
							className="text-sm font-medium text-[#2D74A2] transition hover:text-[#23597B]"
						>
							Lihat Semua
						</button>
					</div>

					<div className="mt-6 grid gap-5 md:grid-cols-2">
						{!isJobsLoading && relatedJobs.length === 0 && (
							<div className="rounded-3xl border border-dashed border-[#D2DACB] bg-white px-6 py-8 text-sm text-[#66725F]">
								Belum ada posisi lain yang bisa ditampilkan.
							</div>
						)}

						{relatedJobs.map((item) => (
							<article
								key={item.id}
								className="rounded-3xl border border-[#DCE4D5] bg-white p-6 shadow-[0_14px_40px_rgba(32,56,24,0.06)]"
							>
								<div className="flex items-start justify-between gap-4">
									<div className="flex items-start gap-3">
										<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E6EDD9] bg-[#F7FAF2] p-2">
											<img src={LogoBas} alt="PT BAS Logo" className="h-full w-full object-contain" />
										</div>
										<div>
											<h3 className="text-lg font-semibold text-[#15210F]">{item.title}</h3>
											<p className="mt-1 text-sm text-[#66725F]">PT. {COMPANY_NAME}</p>
										</div>
									</div>
									<button
									onClick={() => handleShare(item.slug || String(item.id))}
										className="text-[#9AA593] transition hover:text-[#48892F]"
										aria-label={`Bagikan ${item.title}`}
									>
										<ShareAltOutlined />
									</button>
								</div>

								<div className="mt-4 flex items-center gap-2 text-sm text-[#66725F]">
									<EnvironmentOutlined className="text-[#48892F]" />
									<span>{item.location}</span>
								</div>

								<div className="mt-5 border-t border-[#EDF1E8] pt-5">
									<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
										<button
											onClick={() => navigate(`/karirpage/Joblist/${item.slug}`)}
											className="rounded-xl bg-[#F6F8F2] px-5 py-3 text-sm font-medium text-[#48892F] transition hover:bg-[#EDF4E5]"
										>
											Lihat Detail
										</button>
										<button
											onClick={() => navigate('/auth/login')}
											className="rounded-xl bg-[#48892F] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3B7225]"
										>
											Lamar
										</button>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
