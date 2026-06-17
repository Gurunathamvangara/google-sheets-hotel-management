# 📋 PMS SYSTEM - COMPLETE STEP-BY-STEP SETUP GUIDE

## **PART 1: CREATE GOOGLE SHEET** (5 minutes)

### **Step 1.1: Create a New Google Sheet**

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Create"** → **"Blank spreadsheet"**
3. Name it: **`PMS-Namha-30Rooms`**
4. You'll get a Google Sheet ID in the URL like: `1ABC123XYZ...`

---

### **Step 1.2: Create Sheet Tabs**

At the bottom of the sheet, you'll see a tab labeled **"Sheet1"**. Right-click and create these 10 tabs:

1. ✅ **Dashboard** (rename "Sheet1" to this)
2. ✅ **Reservations**
3. ✅ **Guests**
4. ✅ **Rooms**
5. ✅ **Housekeeping**
6. ✅ **Check-in-Checkout**
7. ✅ **Billing**
8. ✅ **Accounting**
9. ✅ **Reports**
10. ✅ **Settings**

**HOW TO CREATE A NEW TAB:**
- Right-click on sheet tab at bottom
- Select **"Insert 1 below"**
- Name it (e.g., "Reservations")
- Click **"Create"**

---

### **Step 1.3: Set Up Column Headers**

Go to each sheet and add headers in **Row 1**:

#### **DASHBOARD Sheet Headers** (Row 1):
```
A: Metric
B: Value
C: Target
D: % Achieved
E: Trend
F: Last Updated
```

#### **RESERVATIONS Sheet Headers** (Row 1):
```
A: Reservation ID
B: Guest Name
C: Check-in Date
D: Check-out Date
E: Room Number
F: Room Type
G: Rate per Night
H: Total Nights
I: Total Amount
J: Payment Status
K: Booking Source
L: Status
M: Special Requests
N: Notes
```

#### **GUESTS Sheet Headers** (Row 1):
```
A: Guest ID
B: Full Name
C: Email
D: Phone
E: Address
F: City
G: Country
H: ID Type
I: ID Number
J: Preferred Room Type
K: Total Stays
L: Total Spent
M: Last Stay Date
N: Notes
```

#### **ROOMS Sheet Headers** (Row 1):
```
A: Room Number
B: Room Type
C: Floor
D: Capacity
E: Amenities
F: Rate
G: Status
H: Last Cleaned
I: Condition
J: Features
```

#### **HOUSEKEEPING Sheet Headers** (Row 1):
```
A: Room Number
B: Status
C: Assigned Staff
D: Check-in Time
E: Check-out Time
F: Cleaning Status
G: Issues Found
H: Maintenance Required
I: Date
J: Priority
```

#### **BILLING Sheet Headers** (Row 1):
```
A: Invoice ID
B: Reservation ID
C: Guest Name
D: Room Number
E: Check-in Date
F: Check-out Date
G: Number of Nights
H: Rate per Night
I: Total Amount
J: Payment Status
K: Payment Date
L: Balance
```

#### **ACCOUNTING Sheet Headers** (Row 1):
```
A: Date
B: Transaction ID
C: Description
D: Category
E: Amount In
F: Amount Out
G: Balance
H: Payment Method
I: Notes
J: Reconciled
```

#### **REPORTS Sheet Headers** (Row 1):
```
A: Report Type
B: Date Range
C: Occupancy Rate
D: Revenue
E: Avg Daily Rate
F: Revenue Per Available Room
G: Guest Count
H: Repeat Guests
```

#### **SETTINGS Sheet Headers** (Row 1):
```
A: Setting Name
B: Value
C: Description
```

#### **CHECK-IN-CHECKOUT Sheet Headers** (Row 1):
```
A: Reservation ID
B: Guest Name
C: Room Number
D: Check-in Date & Time
E: Check-out Date & Time
F: Actual Check-in Time
G: Actual Check-out Time
H: Rate Charged
I: Extras
J: Deposit
K: Refund
L: Notes
```

---

## **PART 2: ADD SAMPLE DATA** (10 minutes)

### **Step 2.1: Add Settings Data**

Go to **Settings** sheet and add:

| Setting Name | Value |
|---|---|
| Property Name | Namha PMS |
| Total Rooms | 30 |
| Standard Rate | 2500 |
| Deluxe Rate | 3500 |
| Suite Rate | 5000 |
| Currency | INR |
| Timezone | IST |
| Check-in Time | 2:00 PM |
| Check-out Time | 11:00 AM |
| Tax Rate | 18% |

---

### **Step 2.2: Add Sample Rooms**

Go to **Rooms** sheet and add 30 rooms:

| Room Number | Room Type | Floor | Capacity | Status | Rate |
|---|---|---|---|---|---|
| 101 | Standard | 1 | 2 | Available | 2500 |
| 102 | Standard | 1 | 2 | Occupied | 2500 |
| 103 | Deluxe | 1 | 2 | Available | 3500 |
| 104 | Deluxe | 1 | 2 | Occupied | 3500 |
| 105 | Suite | 1 | 4 | Available | 5000 |
| ... | ... | ... | ... | ... | ... |
| 310 | Suite | 3 | 4 | Available | 5000 |

**Distribution:**
- 10 Standard Rooms (₹2500)
- 15 Deluxe Rooms (₹3500)
- 5 Suite Rooms (₹5000)

---

### **Step 2.3: Add Sample Guests**

Go to **Guests** sheet and add 5-10 sample guests:

| Guest ID | Full Name | Email | Phone | City |
|---|---|---|---|---|
| G001 | Rajesh Kumar | rajesh@email.com | 9876543210 | Mumbai |
| G002 | Priya Singh | priya@email.com | 9123456789 | Delhi |
| G003 | Amit Patel | amit@email.com | 8765432109 | Bangalore |
| G004 | Sneha Sharma | sneha@email.com | 7654321098 | Pune |
| G005 | Vikram Reddy | vikram@email.com | 6543210987 | Hyderabad |

---

### **Step 2.4: Add Sample Reservations**

Go to **Reservations** sheet and add 10 reservations:

| Reservation ID | Guest Name | Check-in Date | Check-out Date | Room Number | Total Amount | Status |
|---|---|---|---|---|---|---|
| RES001 | Rajesh Kumar | 2026-06-17 | 2026-06-20 | 101 | 7500 | Confirmed |
| RES002 | Priya Singh | 2026-06-17 | 2026-06-19 | 103 | 7000 | Confirmed |
| RES003 | Amit Patel | 2026-06-18 | 2026-06-22 | 105 | 20000 | Confirmed |
| RES004 | Sneha Sharma | 2026-06-18 | 2026-06-20 | 102 | 5000 | Pending |
| RES005 | Vikram Reddy | 2026-06-19 | 2026-06-23 | 104 | 10500 | Confirmed |

---

## **PART 3: SET UP GOOGLE APPS SCRIPT** (15 minutes)

### **Step 3.1: Open Apps Script Editor**

1. In your Google Sheet, go to **Tools** → **Script editor**
2. This opens **Google Apps Script** editor
3. Delete the default code (if any)

---

### **Step 3.2: Copy Scripts from GitHub**

You'll need to copy the following script files from your GitHub repository and paste them into the Apps Script editor.

**Files to copy:**
1. `main.gs`
2. `reservations.gs`
3. `guests.gs`
4. `housekeeping.gs`
5. `billing.gs`
6. `reporting.gs`
7. `utilities.gs`
8. `email-notifications.gs`

---

### **Step 3.3: Create New Script Files in Apps Script**

For each script file:

1. In Apps Script editor, click **"+ Create new"** → **"Script"**
2. Name it (e.g., "main", "reservations", etc.)
3. Copy the entire code from GitHub
4. Paste into the new script file
5. Save (Ctrl+S)

---

### **Step 3.4: Save and Deploy**

1. After pasting all scripts, click **Save** (Ctrl+S)
2. You may see a prompt to select a project name - enter **"PMS-System"**
3. Click **Save**

---

## **PART 4: INITIALIZE THE SYSTEM** (5 minutes)

### **Step 4.1: Run Initialization**

1. In Apps Script editor, look for the function dropdown at top (shows "Select function")
2. Click on it and select **`initializePMS`**
3. Click the **▶ Run** button
4. You'll see a popup asking for permissions - click **"Review permissions"**
5. Select your Google Account
6. Click **"Allow"**

---

### **Step 4.2: Check Authorization**

1. You may get a warning: **"This app isn't verified"**
2. Click **"Advanced"** → **"Go to PMS-System (unsafe)"**
3. Click **"Allow"**

---

### **Step 4.3: Verify Setup**

1. Go back to your Google Sheet
2. You should see a new menu: **"🏨 PMS"** at the top
3. Click it to see options like:
   - 📊 Update Dashboard
   - ✓ Check-in Guest
   - ✗ Check-out Guest
   - ➕ New Reservation
   - etc.

---

## **PART 5: SET UP TRIGGERS** (5 minutes)

### **Step 5.1: Create Automated Triggers**

Triggers automatically run functions at specific times.

1. In Apps Script editor, click **"Triggers"** (left sidebar)
2. Click **"+ Create new trigger"**
3. Set up these triggers:

#### **Trigger 1: Update Dashboard Every Hour**
- Function: `updateDashboard`
- Deployment: `Head`
- Event source: `Time-driven`
- Type of time interval: `Hour timer`
- Interval: `Every hour`
- Click **Save**

#### **Trigger 2: Night Audit Daily at 2:00 AM**
- Function: `nightAudit`
- Deployment: `Head`
- Event source: `Time-driven`
- Type of time interval: `Day timer`
- Time of day: `2:00 AM`
- Click **Save**

#### **Trigger 3: Daily Report at 8:00 AM**
- Function: `sendDailyReport`
- Deployment: `Head`
- Event source: `Time-driven`
- Type of time interval: `Day timer`
- Time of day: `8:00 AM`
- Click **Save**

---

## **PART 6: TEST THE SYSTEM** (10 minutes)

### **Step 6.1: Update Dashboard**

1. Go back to your Google Sheet
2. Click **🏨 PMS** menu → **📊 Update Dashboard**
3. Wait a few seconds
4. Go to **Dashboard** sheet
5. You should see metrics updated:
   - Total Rooms: 30
   - Occupied: (count from sample data)
   - Occupancy Rate: calculated
   - Today's Revenue: calculated

---

### **Step 6.2: Test Check-in Function**

1. Click **🏨 PMS** → **✓ Check-in Guest**
2. A dialog should appear
3. (This is a placeholder - we'll enhance it next)

---

### **Step 6.3: Verify Triggers**

1. In Apps Script editor, click **Executions** (left sidebar)
2. You should see execution logs
3. Check for any errors

---

## **PART 7: CUSTOMIZE FOR YOUR PROPERTY** (10 minutes)

### **Step 7.1: Update Configuration**

In Apps Script editor, open `main.gs` and find:

```javascript
const CONFIG = {
  PROPERTY_NAME: "Your Property Name",
  TIMEZONE: "Asia/Kolkata",
};
```

Change to:
```javascript
const CONFIG = {
  PROPERTY_NAME: "Namha PMS",
  TIMEZONE: "Asia/Kolkata",
};
```

---

### **Step 7.2: Add Your Email for Notifications**

Find this line in `email-notifications.gs`:
```javascript
const ADMIN_EMAIL = "your-email@gmail.com";
```

Change to:
```javascript
const ADMIN_EMAIL = "office.namahprime@gmail.com";
```

---

## **PART 8: NEXT FEATURES TO ADD** (Optional)

After this basic setup, you can add:

- ✅ Automated email notifications
- ✅ Check-in/Check-out forms
- ✅ Payment tracking
- ✅ Housekeeping assignments
- ✅ Guest feedback forms
- ✅ Revenue reports
- ✅ SMS notifications
- ✅ Channel manager integration

---

## **TROUBLESHOOTING**

### **Issue: "Sheet not found" error**
- Make sure all 10 sheet tabs are named exactly as in the scripts
- Check spelling (case-sensitive)

### **Issue: Dashboard not updating**
- Check if triggers are running (see Executions)
- Make sure sample data is in the correct columns

### **Issue: Permission denied**
- Make sure you authorized the script
- Try reauthorizing by going to Settings > Permissions

### **Issue: Functions not appearing in menu**
- Reload the Google Sheet (refresh page)
- Make sure all scripts are saved

---

## **🎉 CONGRATULATIONS!**

Your PMS system is now set up with:

✅ 10 organized sheets
✅ Sample data
✅ Google Apps Scripts
✅ Automated triggers
✅ Custom menu
✅ Dashboard calculations
✅ Email notifications (ready to deploy)
✅ Data validation

**Next:** You can now add more guests, reservations, and continue managing your property!

---

**📞 Need Help?** Refer to the documentation or contact support.

**Last Updated:** June 17, 2026
