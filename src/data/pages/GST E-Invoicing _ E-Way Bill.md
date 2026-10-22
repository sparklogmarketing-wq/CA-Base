---
slug: "/gst-e-invoicing-eway-bill"
cluster: "GST"
pageName: "GST E-Invoicing & E-Way Bill"
pageType: "Service"
intent: "Commercial"
priority: "P1"
primaryKeyword: "GST e-invoicing and e-way bill"
secondaryKeywords: ["e-invoice applicability Rs 5 crore", "Invoice Reference Number IRN", "FORM GST INS-1", "e-way bill threshold Rs 50,000", "FORM EWB-01"]
title: "GST E-Invoicing & E-Way Bill Services | {brand}"
description: "GST e-invoicing and e-way bill services: IRN generation, applicability above the Rs 5 crore threshold, EWB-01 filing and compliance support from {brand}."
h1: "GST E-Invoicing & E-Way Bill Services"
links:
  - slug: "/gst-services"
    anchor: "GST services"
    rel: "hub"
  - slug: "/gst-return-filing"
    anchor: "GST return filing"
    rel: "related"
  - slug: "/gst-registration"
    anchor: "GST registration"
    rel: "related"
  - slug: "/gst-refund"
    anchor: "GST refunds"
    rel: "related"
  - slug: "/it-saas-ecommerce"
    anchor: "IT, SaaS and e-commerce sector support"
    rel: "related"
faqs:
  - q: "Who must generate e-invoices under GST?"
    a: "Any registered person whose aggregate turnover exceeded Rs 5 crore in any financial year from 2017-18 onwards must report tax invoices, credit notes and debit notes for e-invoicing, unless specifically exempted. GST registration must be active on the date of the invoice."
  - q: "What happens if an invoice is issued without an IRN?"
    a: "The invoice is not a valid tax document. Non-generation attracts penalty under section 122, and goods moving without compliant documents face detention and penalty under section 129. Invoices must also be reported within 30 days of the invoice date."
  - q: "When is an e-way bill required?"
    a: "FORM EWB-01 is required whenever goods worth more than Rs 50,000 move, subject to notified exemptions. The bill remains valid for one day for every 200 kilometres, with Part-A giving consignment details and Part-B giving transport details."
  - q: "How are e-invoicing and the e-way bill connected?"
    a: "Once an invoice is authenticated with an IRN, the e-way bill Part-A can be auto-generated from the same data, reducing duplicate entry. ERP or GSP integration can create both documents together and push them to drivers in real time."
  - q: "Do exports need e-invoices and e-way bills?"
    a: "Yes. Export tax invoices must carry an IRN, and export shipments move under an e-way bill. Invoice details are reported in GSTR-1 alongside the shipping bill for refund processing."
  - q: "Can {brand} integrate e-invoicing with our ERP?"
    a: "Yes. We assess applicability, map documents and HSN data, configure generation through the government portal, GSPs or APIs, test round-trip flows and train your finance team, so that every invoice and movement stays compliant."
---

> GST e-invoicing and e-way bill compliance covers two digital controls: electronic invoices whose details are reported to the government portal and authenticated with an Invoice Reference Number, and electronic way bills required in FORM EWB-01 for consignments above Rs 50,000, together replacing paper documentation for most business-to-business supplies.

## Who Must Generate E-Invoices Under GST?

E-invoicing under GST is mandatory for any registered person whose aggregate turnover crossed Rs 5 crore in any financial year from 2017-18 onwards. The test looks backwards: a business that crossed the threshold in an earlier year remains covered even if turnover later falls. The mandate applies to tax invoices, credit notes and debit notes for goods and services, including export invoices, but not to reverse-charge self-invoices, delivery challans or bills of supply.

Notified classes are excluded, including government departments and local authorities, banking companies, insurance companies and NBFCs, GTAs supplying services, passenger transport operators and admission to cinema shows. Applicability also depends on a valid [GST registration](/gst-registration) on the invoice date — a business that qualifies for e-invoicing but registers late cannot simply fall back on manual invoices.

## Invoice Reference Number: Reporting Rules That Matter

An e-invoice is not complete when it is printed. Its JSON payload must be reported to the Invoice Registration Portal — directly through FORM GST INS-1, in bulk, or through GSP/API integration — and only then does the system issue an Invoice Reference Number (IRN) with a signed QR code. Two rules create the most trouble in practice:

- **30-day reporting window.** From 1 April 2023, an invoice must be reported within 30 days of the invoice date. The portal simply rejects later reporting, leaving the document non-compliant.
- **Cancellation.** A reported e-invoice can be cancelled only within 24 hours, so errors in value, GSTIN or HSN codes need immediate correction discipline.

## E-Way Bill Rules: Threshold, Validity and Forms

The e-way bill regime runs parallel to invoicing. Whenever goods worth more than Rs 50,000 move — within a State or inter-State — FORM EWB-01 must be generated before movement begins, subject to notified exemptions for specified goods and short-distance cases. Part-A captures consignment and recipient details; Part-B captures the vehicle number and is updated on transhipment. The bill remains valid for one day for every 200 kilometres or part thereof.

| Parameter | E-Invoice | E-Way Bill |
| --- | --- | --- |
| Trigger | Tax invoice, credit note, debit note above turnover threshold | Movement of consignment above Rs 50,000 |
| Form and portal | FORM GST INS-1 payload to IRP; IRN and QR code issued | FORM EWB-01 on the e-way bill portal |
| Who generates | The registered supplier | Supplier, recipient or transporter |
| Time sensitivity | Report within 30 days of invoice date | Generate before movement; extend while valid |
| Linked returns | Feeds GSTR-1 annexure data | Verified at checkpoints and during audits |

Because both documents share the same data, an authenticated IRN can auto-populate e-way bill Part-A. Businesses running [GST return filing](/gst-return-filing) on reconciled e-invoice data spend far less time on mismatches between books, portal and returns.

## Penalties and Common Failure Points

The enforcement risk is disproportionate to the effort saved by skipping these controls. Issuing an invoice without a valid IRN is treated as issuing a document that is not a tax invoice, attracting penalty under section 122, commonly Rs 10,000 per Act. Goods in transit without a compliant e-way bill and e-invoice face interception, detention under section 129 and penalty calculated as a percentage of the tax involved. The recurring failure points we fix are: invoices generated in an unregistered period, HSN or unit-of-measure errors rejected by the IRP, missed 30-day reporting after backlog billing, and Part-B never updated for multi-leg journeys.

## Get GST E-Invoicing and E-Way Bill Support from {brand}

{brand} provides end-to-end GST e-invoicing and e-way bill services from offices serving businesses in {city} and across India: applicability assessment, registration on the IRP, document and HSN mapping, ERP or GSP integration, 30-day reporting controls, e-way bill standard operating procedures for dispatch teams, and reconciliation of IRN data into returns. For export houses, we connect the same data pipeline to [GST refunds](/gst-refund) processing, and platforms scaling online sales can draw on our [IT, SaaS and e-commerce sector support](/it-saas-ecommerce). To review your current set-up or implement e-invoicing, write to {contact_email} or call {contact_phone}.

## Frequently Asked Questions

### Who must generate e-invoices under GST?

Any registered person whose aggregate turnover exceeded Rs 5 crore in any financial year from 2017-18 onwards must report tax invoices, credit notes and debit notes for e-invoicing, unless specifically exempted. GST registration must be active on the date of the invoice.

### What happens if an invoice is issued without an IRN?

The invoice is not a valid tax document. Non-generation attracts penalty under section 122, and goods moving without compliant documents face detention and penalty under section 129. Invoices must also be reported within 30 days of the invoice date.

### When is an e-way bill required?

FORM EWB-01 is required whenever goods worth more than Rs 50,000 move, subject to notified exemptions. The bill remains valid for one day for every 200 kilometres, with Part-A giving consignment details and Part-B giving transport details.

### How are e-invoicing and the e-way bill connected?

Once an invoice is authenticated with an IRN, the e-way bill Part-A can be auto-generated from the same data, reducing duplicate entry. ERP or GSP integration can create both documents together and push them to drivers in real time.

### Do exports need e-invoices and e-way bills?

Yes. Export tax invoices must carry an IRN, and export shipments move under an e-way bill. Invoice details are reported in GSTR-1 alongside the shipping bill for refund processing.

### Can {brand} integrate e-invoicing with our ERP?

Yes. We assess applicability, map documents and HSN data, configure generation through the government portal, GSPs or APIs, test round-trip flows and train your finance team, so that every invoice and movement stays compliant.

## Related Services

- [GST services](/gst-services)
- [GST return filing](/gst-return-filing)
- [GST registration](/gst-registration)
- [GST refunds](/gst-refund)
- [IT, SaaS and e-commerce sector support](/it-saas-ecommerce)
