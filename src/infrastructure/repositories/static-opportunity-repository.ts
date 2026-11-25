import type { Opportunity } from "@/domain/entities/opportunity";
import type { OpportunityRepository } from "@/domain/repositories/opportunity-repository";

const SEEDED_OPPORTUNITIES: readonly Opportunity[] = [
  {
    id: "uiux-tokopedia",
    title: "UI/UX Designer Intern",
    organization: "Tokopedia",
    organizationBadgeText: "t",
    organizationBadgeClass: "bg-green-50 text-green-700",
    category: "Magang",
    location: "Jakarta",
    workMode: "Hybrid",
    isRemote: false,
    daysLeft: 5,
    tags: ["Desain", "Mahasiswa aktif"],
    highlightTag: "Paid internship",
    compensation: "Rp 3–5 juta / bulan",
    description:
      "Kembangkan potensi dan pengalamanmu bersama Tokopedia. Program ini memberi kesempatan bagi mahasiswa untuk belajar langsung, memperluas relasi, dan membangun keterampilan untuk masa depan.",
    criteria: ["Desain", "Mahasiswa aktif", "Paid internship"],
    publishedOrder: 1,
  },
  {
    id: "beasiswa-bank-indonesia-2025",
    title: "Beasiswa Bank Indonesia 2025",
    organization: "Bank Indonesia",
    organizationBadgeText: "BI",
    organizationBadgeClass: "bg-blue-50 text-blue-800",
    category: "Beasiswa",
    location: "Seluruh Indonesia",
    workMode: "Nasional",
    isRemote: false,
    daysLeft: 8,
    tags: ["S1 / D4", "Semua jurusan"],
    highlightTag: "Fully funded",
    compensation: "Rp 12 juta / tahun",
    description:
      "Dukungan pendidikan dari Bank Indonesia untuk mahasiswa berprestasi lintas jurusan yang aktif berkontribusi dalam komunitas dan kepemimpinan kampus.",
    criteria: ["S1 / D4", "Semua jurusan", "Fully funded"],
    publishedOrder: 2,
  },
  {
    id: "pm-traveloka",
    title: "Product Management Intern",
    organization: "Traveloka",
    organizationBadgeText: "◢",
    organizationBadgeClass: "bg-sky-50 text-sky-600",
    category: "Magang",
    location: "Tangerang",
    workMode: "On-site",
    isRemote: false,
    daysLeft: 12,
    tags: ["Product", "Semester akhir"],
    highlightTag: "Paid internship",
    compensation: "Rp 4–6 juta / bulan",
    description:
      "Terlibat langsung dalam riset pengguna, perumusan roadmap fitur, dan kolaborasi lintas tim engineering serta desain di ekosistem perjalanan Traveloka.",
    criteria: ["Product", "Semester akhir", "Paid internship"],
    publishedOrder: 3,
  },
  {
    id: "google-solution-challenge",
    title: "Google Solution Challenge",
    organization: "Google Developer Groups",
    organizationBadgeText: "G",
    organizationBadgeClass: "bg-orange-50 text-orange-700",
    category: "Kompetisi",
    location: "Online",
    workMode: "Global",
    isRemote: true,
    daysLeft: 15,
    tags: ["Teknologi", "Tim 2–4 orang", "Sertifikat"],
    compensation: "Total hadiah $10.000",
    description:
      "Kompetisi inovasi teknologi global bagi mahasiswa untuk membangun solusi nyata berbasis teknologi Google yang menjawab tantangan berkelanjutan.",
    criteria: ["Teknologi", "Tim 2–4 orang", "Sertifikat"],
    publishedOrder: 4,
  },
  {
    id: "dicoding-frontend-pemula",
    title: "Belajar Front-End untuk Pemula",
    organization: "Dicoding Indonesia",
    organizationBadgeText: "d.",
    organizationBadgeClass: "bg-indigo-50 text-indigo-800",
    category: "Bootcamp",
    location: "Online",
    workMode: "Remote",
    isRemote: true,
    daysLeft: 20,
    tags: ["Pemrograman", "Semua jurusan"],
    highlightTag: "Gratis",
    compensation: "Sertifikat kompetensi",
    description:
      "Kelas terstruktur untuk membangun antarmuka web modern yang interaktif dengan proyek praktik yang dapat langsung ditambahkan ke portofolio.",
    criteria: ["Pemrograman", "Semua jurusan", "Gratis"],
    publishedOrder: 5,
  },
  {
    id: "digital-talent-telkom",
    title: "Digital Talent Scholarship",
    organization: "Telkom Indonesia",
    organizationBadgeText: "T",
    organizationBadgeClass: "bg-red-50 text-red-700",
    category: "Beasiswa",
    location: "Seluruh Indonesia",
    workMode: "Online",
    isRemote: true,
    daysLeft: 25,
    tags: ["Digital", "Mahasiswa aktif"],
    highlightTag: "Fully funded",
    compensation: "Pelatihan & sertifikasi gratis",
    description:
      "Program pelatihan intensif dan sertifikasi kompetensi digital bagi mahasiswa Indonesia untuk mempersiapkan karier di industri teknologi nasional.",
    criteria: ["Digital", "Mahasiswa aktif", "Fully funded"],
    publishedOrder: 6,
  },
];

export class StaticOpportunityRepository implements OpportunityRepository {
  getAll(): readonly Opportunity[] {
    return SEEDED_OPPORTUNITIES;
  }

  getById(id: string): Opportunity | undefined {
    return SEEDED_OPPORTUNITIES.find((item) => item.id === id);
  }
}

export const opportunityRepository = new StaticOpportunityRepository();
