#!/usr/bin/env python3
"""Generate the public, evidence-aligned Raphael Mansueto resume."""

from pathlib import Path
from shutil import copyfile

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_OUTPUT = ROOT / "public" / "resume.pdf"
ARTIFACT_OUTPUT = ROOT / "output" / "pdf" / "raphael-mansueto-resume.pdf"

INK = colors.HexColor("#18181B")
MUTED = colors.HexColor("#52525B")
FAINT = colors.HexColor("#A1A1AA")
ACCENT = colors.HexColor("#0284C7")
LINE = colors.HexColor("#E4E4E7")


def p(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(text, style)


def bullet(text: str, styles: dict[str, ParagraphStyle]) -> Paragraph:
    return Paragraph(f"<font color='#0284C7'>-</font>&nbsp;&nbsp;{text}", styles["bullet"])


def role_block(
    company: str,
    location: str,
    role: str,
    period: str,
    bullets: list[str],
    styles: dict[str, ParagraphStyle],
):
    heading = Table(
        [
            [p(f"<b>{company}</b>", styles["role_heading"]), p(location, styles["meta_right"])],
            [p(role, styles["role_title"]), p(period, styles["meta_right"])],
        ],
        colWidths=[4.9 * inch, 2.05 * inch],
    )
    heading.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    content = [heading, Spacer(1, 4)]
    content.extend(bullet(item, styles) for item in bullets)
    content.append(Spacer(1, 7))
    return KeepTogether(content)


def build_resume(output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=letter,
        rightMargin=0.55 * inch,
        leftMargin=0.55 * inch,
        topMargin=0.43 * inch,
        bottomMargin=0.42 * inch,
        title="Raphael Mansueto - Senior Full-Stack Engineer - AI Integrations",
        author="Raphael Mansueto",
        subject="Professional resume",
    )

    base = getSampleStyleSheet()
    styles = {
        "name": ParagraphStyle(
            "Name",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=24,
            textColor=INK,
            spaceAfter=1,
        ),
        "headline": ParagraphStyle(
            "Headline",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10.2,
            leading=13,
            textColor=ACCENT,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.9,
            leading=10,
            textColor=MUTED,
            alignment=TA_LEFT,
        ),
        "summary": ParagraphStyle(
            "Summary",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=12.1,
            textColor=MUTED,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.2,
            leading=10,
            textColor=INK,
            uppercase=True,
            spaceBefore=5,
            spaceAfter=5,
        ),
        "role_heading": ParagraphStyle(
            "RoleHeading",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.1,
            leading=11,
            textColor=INK,
        ),
        "role_title": ParagraphStyle(
            "RoleTitle",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.2,
            leading=10,
            textColor=ACCENT,
        ),
        "meta_right": ParagraphStyle(
            "MetaRight",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.8,
            leading=10,
            textColor=MUTED,
            alignment=2,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.95,
            leading=10.8,
            textColor=MUTED,
            leftIndent=1,
            firstLineIndent=0,
            spaceAfter=1.7,
        ),
        "skills": ParagraphStyle(
            "Skills",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.9,
            leading=11.2,
            textColor=MUTED,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.9,
            leading=10.8,
            textColor=MUTED,
        ),
    }

    story = [
        p("Raphael Mansueto", styles["name"]),
        p("Senior Full-Stack Engineer | AI Integrations", styles["headline"]),
        Spacer(1, 5),
        p(
            "Cebu City, Philippines&nbsp;&nbsp;|&nbsp;&nbsp;"
            "<link href='mailto:raphaelmansueto@gmail.com' color='#52525B'>raphaelmansueto@gmail.com</link>&nbsp;&nbsp;|&nbsp;&nbsp;"
            "<link href='https://raphaelmansueto.com' color='#52525B'>raphaelmansueto.com</link>&nbsp;&nbsp;|&nbsp;&nbsp;"
            "<link href='https://linkedin.com/in/raphaelmansueto' color='#52525B'>LinkedIn</link>&nbsp;&nbsp;|&nbsp;&nbsp;"
            "<link href='https://github.com/raphaelmans' color='#52525B'>GitHub</link>",
            styles["contact"],
        ),
        Spacer(1, 7),
        p(
            "Senior full-stack engineer with 5+ years building reliable systems across AI integrations, web, and mobile. Recent work includes institutional EVM/Solana settlement, asynchronous AI hiring systems, customizable campaign workflows, and live marketplace products.",
            styles["summary"],
        ),
        Spacer(1, 6),
        Table([[""]], colWidths=[6.95 * inch], rowHeights=[0.6], style=TableStyle([("BACKGROUND", (0, 0), (-1, -1), ACCENT)])),
        p("EXPERIENCE", styles["section"]),
        role_block(
            "VISEO",
            "Cebu, Philippines",
            "Senior Full Stack Developer",
            "June 2025 - Present",
            [
                "Architect operator-facing workflows for an institutional digital-asset settlement platform spanning administration, compliance, client, transaction, and ledger operations.",
                "Extend an EVM-first Next.js portal toward Solana parity using Viem, Wagmi, @solana/web3.js, and wallet adapters behind a consistent network strategy.",
                "Develop Node.js and NestJS gateway services across settlement execution, signing, authentication, banking, and blockchain integration boundaries.",
            ],
            styles,
        ),
        role_block(
            "HustleWing",
            "Illinois, US - Remote",
            "Full-Stack AI Integration Engineer",
            "February 2023 - December 2025",
            [
                "Led frontend and product delivery for a Next.js hiring and entrepreneurship platform, translating requirements into shipped customer and administrative workflows with cross-functional partners.",
                "Built Go and OpenAI services that turned uploaded resumes into validated profiles and personalized application pitches.",
                "Moved long-running resume processing into Google Cloud Pub/Sub with persisted PostgreSQL run records, traceable state, and explicit failure handling.",
                "Connected grounded research, voice interviews, video processing, human approval, and social publishing in a production AI media workflow with observability across asynchronous stages.",
                "Turned business data into customizable campaign drafts with a feedback loop and human decision gate before final use.",
            ],
            styles,
        ),
        role_block(
            "Outliant",
            "Texas, US - Remote",
            "Full-Stack Developer",
            "June 2022 - November 2022",
            [
                "Built Next.js customer experiences and Express APIs for a social platform, plus internal tools used by operations teams.",
                "Delivered server-rendered forms and administrative dashboards that helped users submit complex data and operations teams manage it.",
                "Cleared delayed sprint work and technical debt, helping the team reduce its backlog and restore delivery momentum.",
            ],
            styles,
        ),
        role_block(
            "Vibravid",
            "Michigan, US - Remote",
            "Junior Software Engineer",
            "June 2021 - March 2022",
            [
                "Developed, tested, and deployed Solidity contracts on Ethereum for token transactions and platform features.",
                "Expanded multi-chain and community operations through Node.js integrations with Tron, WAX, Syscoin, and Telegram automation.",
            ],
            styles,
        ),
        p("SKILLS", styles["section"]),
        p(
            "<b>Languages:</b> TypeScript, JavaScript, Go, Solidity, SQL&nbsp;&nbsp; "
            "<b>Product:</b> React, Next.js, Expo, React Native, TanStack Query (React Query), Node.js, NestJS, Gin&nbsp;&nbsp; "
            "<b>AI:</b> OpenAI, Gemini, Mastra, LangGraph, Vercel AI SDK, structured outputs, embeddings, Langfuse&nbsp;&nbsp; "
            "<b>Data and platform:</b> PostgreSQL, Supabase, Drizzle, pgvector, tRPC, Zod, Pub/Sub, Docker, AWS, EVM, Solana&nbsp;&nbsp; "
            "<b>Reliability:</b> XState, Vitest, Playwright, idempotency, transactions, outbox workflows",
            styles["skills"],
        ),
        p("EDUCATION AND RECOGNITION", styles["section"]),
        p(
            "<b>BS Computer Science, Cum Laude</b> - Cebu Institute of Technology - University&nbsp;&nbsp;|&nbsp;&nbsp;"
            "Rank 7, 7th TOPCIT Philippines 2022&nbsp;&nbsp;|&nbsp;&nbsp;"
            "2nd Place, CIB.O Interschool Hackathon 2023",
            styles["small"],
        ),
    ]

    def decorate(canvas, _doc):
        canvas.saveState()
        canvas.setStrokeColor(LINE)
        canvas.setLineWidth(0.5)
        canvas.line(0.55 * inch, 0.31 * inch, 7.95 * inch, 0.31 * inch)
        canvas.setFillColor(FAINT)
        canvas.setFont("Helvetica", 6.8)
        canvas.drawString(0.55 * inch, 0.2 * inch, "Evidence-aligned public resume - reviewed August 2026")
        canvas.restoreState()

    doc.build(story, onFirstPage=decorate, onLaterPages=decorate)


if __name__ == "__main__":
    build_resume(PUBLIC_OUTPUT)
    ARTIFACT_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    copyfile(PUBLIC_OUTPUT, ARTIFACT_OUTPUT)
    print(PUBLIC_OUTPUT)
    print(ARTIFACT_OUTPUT)
