# Property Management System (PMS) - Google Sheets Integration

A comprehensive **Property Management System** built entirely with **Google Sheets** and **Google Apps Script**, featuring real-time reservation management, guest tracking, housekeeping, billing, and reporting.

## 📋 Overview

This PMS system is designed to manage:
- ✅ Reservation Management
- ✅ Guest Profiles & CRM
- ✅ Room Inventory & Status
- ✅ Housekeeping & Maintenance
- ✅ Front Desk Operations
- ✅ Billing & Invoicing
- ✅ Accounting & Expenses
- ✅ Night Audit & Reports
- ✅ Channel Manager Integration
- ✅ Rate Management

## 🗂️ Google Sheets Structure

### Core Sheets:

1. **Dashboard** - Overview sheet with key metrics
2. **Reservations** - All bookings, status, and guest info
3. **Guests** - Guest profiles, contact details, preferences
4. **Rooms** - Room inventory, types, rates, status
5. **Housekeeping** - Room cleaning schedule & status
6. **Check-in/Check-out** - Front desk operations
7. **Billing** - Invoices, payments, balances
8. **Accounting** - Expenses, income, reports
9. **Reports** - Daily reports, occupancy rates, revenue
10. **Settings** - Room types, rates, holidays, users

## 🚀 Quick Start

1. Create a new Google Sheet
2. Follow the sheet structure in `/sheets-structure/`
3. Deploy Google Apps Script from `/scripts/`
4. Set up automation and triggers
5. Access the Dashboard for overview

## 📁 Project Structure

```
/
├── README.md
├── sheets-structure/
│   ├── OVERVIEW.md
│   ├── Dashboard-Sheet.md
│   ├── Reservations-Sheet.md
│   ├── Guests-Sheet.md
│   ├── Rooms-Sheet.md
│   ├── Housekeeping-Sheet.md
│   ├── Billing-Sheet.md
│   ├── Accounting-Sheet.md
│   ├── Reports-Sheet.md
│   └── Settings-Sheet.md
├── scripts/
│   ├── main.gs
│   ├── reservations.gs
│   ├── guests.gs
│   ├── housekeeping.gs
│   ├── billing.gs
│   ├── reporting.gs
│   └── utilities.gs
├── sample-data/
│   ├── sample-guests.json
│   ├── sample-reservations.json
│   └── sample-rooms.json
└── docs/
    ├── SETUP.md
    ├── USER-GUIDE.md
    └── API-REFERENCE.md
```

## 🔧 Features

### Reservations
- Create, edit, delete reservations
- Color-coded booking status
- Automatic guest email notifications
- Block dates for maintenance

### Guest Management
- Store guest profiles with preferences
- Track guest history
- Auto-populate returning guests
- Store payment methods

### Housekeeping
- Track room cleaning status
- Maintenance request logging
- Daily assignment lists
- Staff efficiency reports

### Billing
- Generate invoices automatically
- Track payments & balances
- Multi-currency support
- Late payment notifications

### Reporting
- Daily occupancy reports
- Revenue analysis
- Guest statistics
- Staff performance metrics

## 📊 Sample Overview Sheet

See `sheets-structure/OVERVIEW.md` for detailed sheet layout.

## 🔐 Data Security

- All data stored in Google Sheets (encrypted)
- User authentication via Google
- Role-based access control
- Automated backups

## 📞 Support

For documentation, see `/docs/` folder.

---

**Created for easy property management without coding required!**
