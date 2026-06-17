# 🏨 PMS System - Complete Deployment Guide

## ✅ Code Status: VERIFIED & READY TO USE

The `PMS-COMPLETE.gs` file has been verified and is **100% ready** to deploy to Google Apps Script.

---

## 📋 QUICK START (5 Minutes)

### Step 1: Open Google Sheets
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a NEW spreadsheet or open an existing one

### Step 2: Create Required Sheets
Before deploying the script, create these sheets in your spreadsheet:

| Sheet Name | Purpose |
|-----------|---------|
| Dashboard | Real-time metrics & KPIs |
| Reservations | Guest bookings |
| Guests | Guest profiles |
| Rooms | Room inventory |
| Housekeeping | Cleaning & maintenance |
| Billing | Invoices & payments |
| Accounting | Financial records |
| Reports | Generated reports |
| Check-in-Checkout | Check-in/out records |
| Settings | System settings |

**Quick way to create sheets:**
- Right-click on sheet tab → "Insert sheet" → name it
- Repeat for each sheet above

### Step 3: Access Apps Script Editor
1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy and paste the entire **PMS-COMPLETE.gs** code

### Step 4: Deploy the Script
1. Click **Save** (Ctrl+S)
2. Go back to your Google Sheet
3. Refresh the page (F5)
4. You should see a new menu: **🏨 PMS**
5. Click **🏨 PMS** → **Settings** to verify

---

## 🚀 First Time Setup

### Run Initialization
1. Click **🏨 PMS** → **⚙️ Settings**
2. Verify your settings show:
   - Property Name: Namha PMS
   - Total Rooms: 30
   - Timezone: Asia/Kolkata
   - Admin Email: office.namahprime@gmail.com

### Initialize Dashboard
1. Click **🏨 PMS** → **📊 Update Dashboard**
2. The Dashboard sheet will populate with sample data

---

## 📊 Available Functions

### 1. **Dashboard Management**
- `updateDashboard()` - Updates all metrics in real-time
- **Menu:** 🏨 PMS → 📊 Update Dashboard

### 2. **Reservations**
- `addReservation()` - Create new booking
- `processCheckIn()` - Check-in guest
- `processCheckOut()` - Check-out guest
- **Menu:** 🏨 PMS → ✓ Check-in Guest / ✗ Check-out Guest / ➕ New Reservation

### 3. **Guest Management**
- `addGuest()` - Add new guest
- `searchGuestByName()` - Find guest
- `updateGuestStats()` - Update guest records
- **Menu:** 🏨 PMS → 🧑 New Guest

### 4. **Room Management**
- `addRoom()` - Add room to inventory
- `updateRoomStatus()` - Mark room status
- `getAvailableRooms()` - Find available rooms
- **Menu:** Not in menu, use in formulas

### 5. **Housekeeping**
- `createHousekeepingTask()` - Assign cleaning
- `assignHousekeepingTask()` - Assign to staff
- `reportMaintenanceIssue()` - Report problems
- **Menu:** 🏨 PMS → 🔧 Report Maintenance

### 6. **Billing**
- `createInvoice()` - Generate invoice
- `updatePaymentStatus()` - Record payment
- `getPendingPayments()` - View unpaid invoices
- **Menu:** 🏨 PMS → 💳 Add Payment

### 7. **Reports**
- `getOccupancyReport()` - Occupancy analysis
- `getRevenueReport()` - Revenue analysis
- `getGuestStatistics()` - Guest insights
- **Menu:** 🏨 PMS → 📈 Generate Reports

---

## 🧪 TESTING THE CODE

### Test 1: Dashboard Update
```
Steps:
1. Click 🏨 PMS → 📊 Update Dashboard
2. Check if Dashboard sheet updates
3. Should show: Total Rooms, Occupied, Revenue, etc.
Expected: ✅ Dashboard populated with data
```

### Test 2: Add a Guest
```
Steps:
1. Click 🏨 PMS → 🧑 New Guest
2. Fill form:
   - Name: John Doe
   - Email: john@example.com
   - Phone: 9876543210
   - City: Delhi
3. Click "Add Guest"
Expected: ✅ Guest added to Guests sheet
```

### Test 3: Add a Reservation
```
Steps:
1. Click 🏨 PMS → ➕ New Reservation
2. Fill form:
   - Guest: John Doe
   - Check-in: Tomorrow's date
   - Check-out: 3 days later
   - Room: 101
   - Type: Standard
   - Rate: 2500
3. Click "Create Reservation"
Expected: ✅ Reservation created in Reservations sheet
```

### Test 4: Check-in Guest
```
Steps:
1. First create a reservation (Test 3)
2. Click 🏨 PMS → ✓ Check-in Guest
3. Enter the Reservation ID (from Reservations sheet, column A)
4. Click "Check-in"
Expected: ✅ Reservation status changes to "Checked-in"
```

### Test 5: Generate Reports
```
Steps:
1. Click 🏨 PMS → 📈 Generate Reports
2. Check Reports sheet
Expected: ✅ Report shows occupancy and revenue
```

---

## ⚙️ CONFIGURATION

### Edit Configuration
Open `PMS-COMPLETE.gs` and edit lines 14-31:

```javascript
const CONFIG = {
  PROPERTY_NAME: "Namha PMS",           // Change your property name
  TOTAL_ROOMS: 30,                      // Change number of rooms
  TIMEZONE: "Asia/Kolkata",             // Change timezone
  ADMIN_EMAIL: "office.namahprime@gmail.com",  // Change email
};
```

### Save changes:
- Click **Save** in Apps Script editor
- Go back to Sheet and refresh

---

## 🔧 TROUBLESHOOTING

### Issue: "Sheet not found" error
**Solution:** Make sure all required sheets exist (see Step 2 above)

### Issue: Menu not appearing
**Solution:** 
1. Refresh the page (F5)
2. Close and reopen the sheet
3. Look for 🏨 PMS menu

### Issue: Dialog boxes don't open
**Solution:**
1. Check browser console (F12)
2. Make sure all sheets are created
3. Clear browser cache and refresh

### Issue: Syntax Error
**Solution:**
1. Go to Apps Script editor (Extensions → Apps Script)
2. Click **Run** → Select `initializePMS`
3. Check logs for error details

---

## 📈 AUTOMATION SETUP

### Automatic Dashboard Updates
- **Frequency:** Every 1 hour
- **Function:** `updateDashboard()`
- **Status:** Already configured ✅

### Night Audit (Daily Report)
- **Time:** 2:00 AM daily
- **Function:** `nightAudit()`
- **Status:** Already configured ✅

### Check Triggers
1. Go to **Extensions** → **Apps Script**
2. Click **Triggers** (clock icon, bottom left)
3. You should see 2 triggers listed

---

## 📧 ENABLE EMAIL NOTIFICATIONS (Optional)

### To send daily email reports:
1. Open `PMS-COMPLETE.gs`
2. Go to line 918 in `sendDailyReport()` function
3. Uncomment this line:
   ```javascript
   // GmailApp.sendEmail(CONFIG.ADMIN_EMAIL, "Daily PMS Report", emailBody);
   ```
   Remove the `//` to become:
   ```javascript
   GmailApp.sendEmail(CONFIG.ADMIN_EMAIL, "Daily PMS Report", emailBody);
   ```
4. Click **Save**

---

## 🎨 CUSTOMIZATION GUIDE

### Add New Room Type
Edit line 26-27 in dialogs to add more room types:
```javascript
<option value="Standard">Standard</option>
<option value="Deluxe">Deluxe</option>
<option value="Suite">Suite</option>
<option value="Presidential">Presidential</option>  // Add this
```

### Change Currency
Search for "₹" symbol and replace with your currency symbol (e.g., "$", "€")

### Add New Metrics to Dashboard
1. Edit `updateDashboard()` function (around line 100)
2. Add new calculation
3. Add to metrics array

---

## 📚 FUNCTION REFERENCE

### Check-in/Check-out
```javascript
processCheckIn("RES1234567890")      // Check in with reservation ID
processCheckOut("101")               // Check out from room 101
```

### Guest Operations
```javascript
addGuest("John", "john@email.com", "9876543210", "Address", "City", "Country")
searchGuestByName("John")
updateGuestStats("G1234567890", 5000)  // Update guest with amount spent
```

### Room Operations
```javascript
addRoom(101, "Standard", 1, 2, "AC,WiFi", 2500, "Available")
updateRoomStatus(101, "Occupied")
getAvailableRooms()
```

### Housekeeping
```javascript
createHousekeepingTask(101, "Cleaning", "John", "Normal")
assignHousekeepingTask(101, "John")
reportMaintenanceIssue(101, "AC not working", "High")
```

### Billing
```javascript
createInvoice("RES123", "John", 101, "2024-01-01", "2024-01-05", 4, 2500, 10000)
updatePaymentStatus("INV123", "Paid", new Date())
getPendingPayments()
calculateTotalRevenue()
```

### Reporting
```javascript
getOccupancyReport("2024-01-01", "2024-01-31")
getRevenueReport("2024-01-01", "2024-01-31")
getGuestStatistics()
```

---

## ✅ VERIFICATION CHECKLIST

Before going live:

- [ ] All 10 required sheets created
- [ ] Code deployed without errors
- [ ] Dashboard menu appears
- [ ] Dashboard updates successfully
- [ ] Can add a guest
- [ ] Can create a reservation
- [ ] Can check-in a guest
- [ ] Can generate a report
- [ ] Settings show correct property info
- [ ] Help menu is accessible

---

## 🚀 YOU'RE READY!

Your PMS System is now **fully functional** and ready to manage your hotel operations.

**Start using it:**
1. Click **🏨 PMS** menu
2. Add your rooms and guests
3. Create and manage reservations
4. Monitor dashboard metrics
5. Generate reports

**Questions or issues?** Check the troubleshooting section above.

---

**Made with ❤️ for Namha Hotel Management**
