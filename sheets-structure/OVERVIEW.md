# PMS System - Google Sheets Structure Overview

## 📊 Sample Overview Sheet (Dashboard)

This is the main dashboard that displays key metrics and quick access to all modules.

---

### **1. DASHBOARD SHEET** (Home Page)

```
┌────────────────────────────────────────────���────────────────────────┐
│                    PROPERTY MANAGEMENT SYSTEM                       │
│                         DASHBOARD - TODAY                           │
│                      📅 June 17, 2026                               │
└─────────────────────────────────────────────────────────────────────┘

╔═══════════════════════════════════════════════════════════════════════╗
║                        📈 KEY METRICS TODAY                          ║
╚═══════════════════════════════════════════════════════════════════════╝

┌─────────────────┬──────────────┬──────────────┬──────────────┐
│ Total Rooms     │ Occupied     │ Vacant       │ Maintenance  │
├─────────────────┼──────────────┼──────────────┼──────────────┤
│      50         │     35       │     12       │      3       │
│   [100%]        │   [70%]      │   [24%]      │   [6%]       │
└─────────────────┴──────────────┴──────────────┴──────────────┘

┌──────────────────────────────────────────────────────────┐
│           💰 FINANCIAL SUMMARY                           │
├──────────────────────────────────────────────────────────┤
│ Today's Revenue        │ $2,450                          │
│ This Month Revenue     │ $45,320                         │
│ Pending Payments       │ $1,200                          │
│ Average Room Rate      │ $85.50                          │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│           📋 RESERVATION SUMMARY                         │
├──────────────────────────────────────────────────────────┤
│ Check-ins Today        │ 8 guests                        │
│ Check-outs Today       │ 12 guests                       │
│ Pending Confirmations  │ 3 reservations                  │
│ Next 7 Days Bookings   │ 45 reservations                 │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│           🏨 HOUSEKEEPING STATUS                         │
├──────────────────────────────────────────────────────────┤
│ Rooms Cleaned Today    │ 28 / 35                         │
│ Pending Cleaning       │ 7 rooms                         │
│ Maintenance Requests   │ 2 requests                      │
│ Staff On Duty          │ 5 staff members                 │
└──────────────────────────────────────────────────────────┘

╔═══════════════════════════════════════════════════════════════════════╗
║                    ⚡ QUICK ACTION BUTTONS                           ║
╚═══════════════════════════════════════════════════════════════════════╝

[✚ New Reservation]  [✓ Check-in Guest]  [✗ Check-out Guest]
[📝 New Guest]       [🔧 Maintenance]    [💳 Add Payment]
[📊 View Reports]    [⚙️ Settings]


╔═══════════════════════════════════════════════════════════════════════╗
║                 📅 TODAY'S SCHEDULE (Check-ins/Check-outs)          ║
╚═══════════════════════════════════════════════════════════════════════╝

┌──────┬──────────────────┬────────────┬──────────┬───────────┐
│ Room │ Guest Name       │ Type       │ Time     │ Status    │
├──────┼──────────────────┼────────────┼──────────┼───────────┤
│ 101  │ John Smith       │ Deluxe     │ 3:00 PM  │ CHECK-IN  │
│ 102  │ Sarah Johnson    │ Standard   │ 11:00 AM │ CHECK-OUT │
│ 205  │ Mike Davis       │ Suite      │ 2:30 PM  │ CHECK-IN  │
│ 301  │ Emma Wilson      │ Deluxe     │ 10:30 AM │ CHECK-OUT │
│ 305  │ Robert Brown     │ Standard   │ 4:00 PM  │ CHECK-IN  │
│ 401  │ Lisa Anderson    │ Suite      │ 11:15 AM │ CHECK-OUT │
│ 403  │ David Martinez   │ Standard   │ 3:30 PM  │ CHECK-IN  │
│ 405  │ Jennifer Taylor  │ Deluxe     │ 10:45 AM │ CHECK-OUT │
└──────┴──────────────────┴────────────┴──────────┴───────────┘

[⬅ Yesterday]  [Today]  [Tomorrow ➜]

╔═══════════════════════════════════════════════════════════════════════╗
║              🔔 ALERTS & NOTIFICATIONS                              ║
╚═══════════════════════════════════════════════════════════════════════╝

⚠️  Room 215 - Maintenance issue reported
⚠️  Guest in Room 301 - Special request: Late checkout
✓  Payment received from Booking.com - $850
⏰ 2 late check-outs expected today
```

---

## 🗂️ Sheet Tabs (Navigation)

```
[Dashboard] [Reservations] [Guests] [Rooms] [Housekeeping] 
[Billing] [Accounting] [Reports] [Settings]
```

---

## 📋 Column Structure Example

### **Dashboard Sheet Columns:**

| Metric | Value | Target | % Achieved | Trend |
|--------|-------|--------|-----------|-------|
| Occupancy Rate | 70% | 75% | 93% | ↑ |
| Avg Daily Rate | $85.50 | $90 | 95% | ↓ |
| Revenue Per Available Room | $59.85 | $65 | 92% | ↑ |
| Guest Satisfaction | 4.6/5 | 4.5/5 | 102% | ↑ |

---

## 🎯 Key Features of This Dashboard:

✅ **Real-time Metrics** - Auto-updated from other sheets
✅ **Quick Navigation** - Links to all main sheets
✅ **Visual Indicators** - Color-coded statuses
✅ **Daily Summary** - Today's check-ins/check-outs
✅ **Financial Overview** - Revenue & pending payments
✅ **Alert System** - Important notifications
✅ **Housekeeping Status** - Room cleaning progress

---

## 📱 How to Use:

1. Open the Dashboard sheet first every day
2. Review key metrics and alerts
3. Click on quick action buttons to navigate
4. Check today's schedule for check-ins/check-outs
5. Access other sheets as needed

---

**Last Updated:** June 17, 2026 | **Auto-refresh:** Every 5 minutes
