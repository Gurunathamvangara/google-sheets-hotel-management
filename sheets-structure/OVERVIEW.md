# 🏨 PMS DASHBOARD - EasyPMS Compatible Overview

## **Sample Dashboard Sheet Layout (Google Sheets)**

---

### **SECTION 1: QUICK STATS (At-a-Glance)**

```
┌────────────────────────────────────────────────────────────────────────┐
│  PROPERTY MANAGEMENT SYSTEM - DASHBOARD                               │
│  📅 June 17, 2026 | 🕐 Last Updated: 12:35 PM                          │
└────────────────────────────────────────────────────────────────────────┘

╔════════════════════════════════════════════════════════════════════════╗
║                      TODAY'S KEY METRICS                              ║
╚════════════════════════════════════════════════════════════════════════╝

┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│  🏠 OCCUPANCY   │  💰 REVENUE     │  👥 CHECK-INS   │  👤 CHECK-OUTS  │
├─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│     70% (35/50) │   $2,450.00     │      8 guests   │    12 guests    │
│    STATUS: GOOD │   MONTH: $45.3K │  Time: 3:00 PM  │ Time: 11:00 AM  │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

---

### **SECTION 2: ROOM STATUS GRID (Color-Coded)**

```
ROOM OCCUPANCY STATUS:

┌──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┐
│ 101  │ 102  │ 103  │ 104  │ 105  │ 201  │ 202  │ 203  │ 204  │ 205  │
│ ✓OCC │ ✓OCC │ VACANT│✓OCC │✓OCC │✓OCC │VACANT│MAINT │✓OCC │ VACANT│
└──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┘

Legend:
✓OCC   = Occupied (Green)
VACANT = Available (Blue)
MAINT  = Maintenance (Red)
DND    = Do Not Disturb (Yellow)
```

---

### **SECTION 3: RESERVATIONS - TODAY'S SCHEDULE**

**TABLE: Today's Check-ins & Check-outs**

| Room | Guest Name | Status | Check-in Time | Check-out Time | Room Type | Rate | Actions |
|------|------------|--------|---------------|----------------|-----------|------|---------|
| 101  | John Smith | CHECK-IN | 3:00 PM | (TBA) | Deluxe | $95 | ✓ Check-in |
| 102  | Sarah Johnson | CHECK-OUT | (TBA) | 11:00 AM | Standard | $65 | ✓ Check-out |
| 205  | Mike Davis | CHECK-IN | 2:30 PM | (TBA) | Suite | $150 | ✓ Check-in |
| 301  | Emma Wilson | CHECK-OUT | (TBA) | 10:30 AM | Deluxe | $95 | ✓ Check-out |
| 305  | Robert Brown | CHECK-IN | 4:00 PM | (TBA) | Standard | $65 | ✓ Check-in |
| 401  | Lisa Anderson | CHECK-OUT | (TBA) | 11:15 AM | Suite | $150 | ✓ Check-out |
| 403  | David Martinez | CHECK-IN | 3:30 PM | (TBA) | Standard | $65 | ✓ Check-in |
| 405  | Jennifer Taylor | CHECK-OUT | (TBA) | 10:45 AM | Deluxe | $95 | ✓ Check-out |

---

### **SECTION 4: HOUSEKEEPING STATUS**

```
HOUSEKEEPING SUMMARY:

Total Rooms Cleaned Today: 28 / 35
Rooms Pending Cleaning: 7
Maintenance Issues: 2
Staff On Duty: 5

Room Cleaning Status:
┌─────────────────────────────────────────────────────┐
│ Completed (Green)  ██████████████████ 28 rooms      │
│ In Progress (Blue) ████ 4 rooms                      │
│ Pending (Red)      ███ 3 rooms                       │
└──────────────────────────────────────────��──────────┘
```

---

### **SECTION 5: ALERTS & NOTIFICATIONS**

```
⚠️  ALERTS & PENDING ACTIONS:

🔴 URGENT:
   • Room 215 - Maintenance issue: AC not working
   • Guest in Room 301 - Late checkout requested

⚡ IMPORTANT:
   • 2 pending check-outs expected
   • Housekeeping: 3 rooms need cleaning by 2 PM
   • Payment received from Booking.com: $850

✓ COMPLETED TODAY:
   • Room 102 inspected & cleaned
   • 12 guest check-outs processed
```

---

### **SECTION 6: QUICK ACTION BUTTONS**

```
[➕ New Reservation]  [✓ Check-in]  [✗ Check-out]
[🧑 New Guest]       [🔧 Report Maintenance]  [💳 Add Payment]
[📊 View Reports]    [👥 Guest List]  [⚙️ Settings]
```

---

### **SECTION 7: FINANCIAL SUMMARY**

| Metric | Today | This Week | This Month | This Year |
|--------|-------|-----------|------------|-----------|
| Room Revenue | $2,450 | $16,800 | $45,320 | $892,450 |
| Other Revenue | $320 | $2,100 | $5,200 | $98,760 |
| Total Revenue | $2,770 | $18,900 | $50,520 | $991,210 |
| Pending Payments | $1,200 | $3,500 | $8,900 | $45,600 |

---

### **SECTION 8: ROOM TYPE BREAKDOWN**

| Room Type | Total | Occupied | Vacant | Maintenance | Occupancy % |
|-----------|-------|----------|--------|-------------|-------------|
| Standard | 20 | 14 | 5 | 1 | 70% |
| Deluxe | 20 | 15 | 4 | 1 | 75% |
| Suite | 10 | 6 | 3 | 1 | 60% |
| **TOTAL** | **50** | **35** | **12** | **3** | **70%** |

---

### **SECTION 9: NAVIGATION MENU**

```
MAIN MODULES:
├── Dashboard (Current)
├── Reservations (Calendar View / List View)
├── Guests (Profiles / Check-in/Check-out)
├── Rooms (Inventory / Status / Rates)
├── Housekeeping (Task List / Room Status)
├── Billing (Invoices / Payments / Folio)
├── Accounting (Income / Expenses / Reports)
├── Reports (Occupancy / Revenue / Analytics)
├── Channel Manager (OTA Integration)
├── Settings (Configuration / Users)
└── Help & Support
```

---

### **SECTION 10: GOOGLE SHEETS COLUMNS (Editable)**

```
Column A: Section Name
Column B: Metric/Description
Column C: Value
Column D: Target
Column E: % Achieved
Column F: Trend (↑ ↓ ➜)
Column G: Notes
```

---

## ✅ EasyPMS Alignment Checklist

- ✅ Dashboard with key metrics at-a-glance
- ✅ Room status color-coded grid
- ✅ Today's check-ins/check-outs schedule
- ✅ Housekeeping status summary
- ✅ Alerts & notifications
- ✅ Quick action buttons
- ✅ Financial summary
- ✅ Room type breakdown
- ✅ Multi-module navigation
- ✅ Guest management integration

---

**Last Updated:** June 17, 2026 | **Auto-refresh every 5 minutes**
