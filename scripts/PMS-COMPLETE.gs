/**
 * ================================================
 * COMPLETE PMS SYSTEM - SINGLE UNIFIED CODE
 * ================================================
 * Property Management System with Google Sheets
 * All functions in one file ready to deploy
 * ================================================
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
  PROPERTY_NAME: "Namha PMS",
  TOTAL_ROOMS: 30,
  SHEETS: {
    DASHBOARD: "Dashboard",
    RESERVATIONS: "Reservations",
    GUESTS: "Guests",
    ROOMS: "Rooms",
    HOUSEKEEPING: "Housekeeping",
    BILLING: "Billing",
    ACCOUNTING: "Accounting",
    REPORTS: "Reports",
    CHECKIN_CHECKOUT: "Check-in-Checkout",
    SETTINGS: "Settings",
  },
  TIMEZONE: "Asia/Kolkata",
  ADMIN_EMAIL: "office.namahprime@gmail.com",
};

// ============================================
// 1. INITIALIZATION & SETUP
// ============================================

function initializePMS() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const dashSheet = ss.getSheetByName(CONFIG.SHEETS.DASHBOARD);
    
    if (!dashSheet) {
      SpreadsheetApp.getUi().alert("❌ Error: Dashboard sheet not found!");
      return;
    }
    
    setupTriggers();
    updateDashboard();
    createCustomMenu();
    
    Logger.log("✅ PMS System Initialized at " + new Date());
    SpreadsheetApp.getUi().alert("✅ PMS System Initialized Successfully!\n\nYou can now use the 🏨 PMS menu to manage your property.");
  } catch (error) {
    Logger.log("❌ Error during initialization: " + error);
    SpreadsheetApp.getUi().alert("❌ Error: " + error.message);
  }
}

function createCustomMenu() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("🏨 PMS")
    .addItem("📊 Update Dashboard", "updateDashboard")
    .addSeparator()
    .addItem("✓ Check-in Guest", "openCheckInDialog")
    .addItem("✗ Check-out Guest", "openCheckOutDialog")
    .addItem("➕ New Reservation", "openNewReservationDialog")
    .addItem("🧑 New Guest", "openNewGuestDialog")
    .addSeparator()
    .addItem("💳 Add Payment", "openPaymentDialog")
    .addItem("🔧 Report Maintenance", "openMaintenanceDialog")
    .addSeparator()
    .addItem("📈 Generate Reports", "generateReports")
    .addItem("⚙️ Settings", "openSettings")
    .addItem("ℹ️ Help", "showHelp")
    .addToUi();
}

function setupTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  ScriptApp.newTrigger("updateDashboard")
    .timeBased()
    .everyHours(1)
    .create();
  
  ScriptApp.newTrigger("nightAudit")
    .timeBased()
    .atHour(2)
    .everyDays(1)
    .create();
  
  Logger.log("✅ Triggers set up successfully");
}

// ============================================
// 2. DASHBOARD FUNCTIONS
// ============================================

function updateDashboard() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const dashSheet = ss.getSheetByName(CONFIG.SHEETS.DASHBOARD);
    const roomsSheet = ss.getSheetByName(CONFIG.SHEETS.ROOMS);
    const reservationSheet = ss.getSheetByName(CONFIG.SHEETS.RESERVATIONS);
    const billingSheet = ss.getSheetByName(CONFIG.SHEETS.BILLING);
    const housekeepingSheet = ss.getSheetByName(CONFIG.SHEETS.HOUSEKEEPING);
    
    if (!dashSheet || !roomsSheet || !reservationSheet) {
      Logger.log("❌ Error: Required sheets not found");
      return;
    }
    
    const roomsData = roomsSheet.getDataRange().getValues();
    const reservationData = reservationSheet.getDataRange().getValues();
    const billingData = billingSheet.getDataRange().getValues();
    const housekeepingData = housekeepingSheet.getDataRange().getValues();
    
    const totalRooms = CONFIG.TOTAL_ROOMS;
    const occupiedRooms = countOccupiedRooms(roomsData);
    const vacantRooms = totalRooms - occupiedRooms;
    const occupancyRate = ((occupiedRooms / totalRooms) * 100).toFixed(1);
    
    const todayRevenue = calculateTodayRevenue(billingData);
    const checkInsToday = countCheckInsToday(reservationData);
    const checkOutsToday = countCheckOutsToday(reservationData);
    const roomsCleaned = countRoomsCleaned(housekeepingData);
    const pendingCleaning = countPendingCleaning(housekeepingData);
    
    dashSheet.clearContents();
    
    dashSheet.getRange("A1:F1").setValues([["Metric", "Value", "Target", "% Achieved", "Trend", "Last Updated"]]);
    
    const metrics = [
      ["Total Rooms", totalRooms, "-", "-", "-", new Date()],
      ["Occupied Rooms", occupiedRooms, "-", occupancyRate + "%", "↑", new Date()],
      ["Vacant Rooms", vacantRooms, "-", ((vacantRooms/totalRooms)*100).toFixed(1) + "%", "↓", new Date()],
      ["Occupancy Rate", occupancyRate + "%", "80%", ((occupancyRate/80)*100).toFixed(0) + "%", "↑", new Date()],
      ["", "", "", "", "", ""],
      ["Today's Revenue", "₹" + todayRevenue.toFixed(2), "-", "-", "↑", new Date()],
      ["Check-ins Today", checkInsToday, "-", "-", "-", new Date()],
      ["Check-outs Today", checkOutsToday, "-", "-", "-", new Date()],
      ["", "", "", "", "", ""],
      ["Rooms Cleaned", roomsCleaned, totalRooms, ((roomsCleaned/totalRooms)*100).toFixed(0) + "%", "↑", new Date()],
      ["Pending Cleaning", pendingCleaning, "0", "-", "↓", new Date()],
    ];
    
    dashSheet.getRange(2, 1, metrics.length, 6).setValues(metrics);
    dashSheet.getRange("A1:F1").setBackground("#4285F4").setFontColor("white").setFontWeight("bold");
    
    Logger.log("✅ Dashboard updated at " + new Date());
  } catch (error) {
    Logger.log("❌ Error updating dashboard: " + error);
  }
}

// ============================================
// 3. CALCULATION FUNCTIONS
// ============================================

function countOccupiedRooms(roomsData) {
  let count = 0;
  for (let i = 1; i < roomsData.length; i++) {
    if (roomsData[i][6] && roomsData[i][6].toString().toUpperCase() === "OCCUPIED") {
      count++;
    }
  }
  return count;
}

function calculateTodayRevenue(billingData) {
  let total = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 1; i < billingData.length; i++) {
    const date = new Date(billingData[i][0]);
    date.setHours(0, 0, 0, 0);
    
    if (date.getTime() === today.getTime() && billingData[i][8]) {
      const amount = parseFloat(billingData[i][8].toString().replace(/[^0-9.]/g, '')) || 0;
      total += amount;
    }
  }
  return total;
}

function countCheckInsToday(reservationData) {
  let count = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 1; i < reservationData.length; i++) {
    const checkInDate = new Date(reservationData[i][2]);
    checkInDate.setHours(0, 0, 0, 0);
    
    if (checkInDate.getTime() === today.getTime() && reservationData[i][2]) {
      count++;
    }
  }
  return count;
}

function countCheckOutsToday(reservationData) {
  let count = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 1; i < reservationData.length; i++) {
    const checkOutDate = new Date(reservationData[i][3]);
    checkOutDate.setHours(0, 0, 0, 0);
    
    if (checkOutDate.getTime() === today.getTime() && reservationData[i][3]) {
      count++;
    }
  }
  return count;
}

function countRoomsCleaned(housekeepingData) {
  let count = 0;
  for (let i = 1; i < housekeepingData.length; i++) {
    if (housekeepingData[i][5] && housekeepingData[i][5].toString().toUpperCase() === "COMPLETED") {
      count++;
    }
  }
  return count;
}

function countPendingCleaning(housekeepingData) {
  let count = 0;
  for (let i = 1; i < housekeepingData.length; i++) {
    if (housekeepingData[i][5] && housekeepingData[i][5].toString().toUpperCase() === "PENDING") {
      count++;
    }
  }
  return count;
}

// ============================================
// 4. RESERVATION FUNCTIONS
// ============================================

function addReservation(guestName, checkInDate, checkOutDate, roomNumber, roomType, ratePerNight) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.RESERVATIONS);
    
    const reservationId = "RES" + Date.now();
    const nights = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
    const totalAmount = nights * ratePerNight;
    
    const newRow = [reservationId, guestName, checkInDate, checkOutDate, roomNumber, roomType, ratePerNight, nights, totalAmount, "Pending", "Direct", "Confirmed", "", ""];
    sheet.appendRow(newRow);
    
    Logger.log("✅ Reservation added: " + reservationId);
    return reservationId;
  } catch (error) {
    Logger.log("❌ Error adding reservation: " + error);
    return null;
  }
}

function getReservation(reservationId) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.RESERVATIONS);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === reservationId) {
        return data[i];
      }
    }
    return null;
  } catch (error) {
    Logger.log("❌ Error getting reservation: " + error);
    return null;
  }
}

function updateReservationStatus(reservationId, newStatus) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.RESERVATIONS);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === reservationId) {
        sheet.getRange(i + 1, 12).setValue(newStatus);
        Logger.log("✅ Reservation " + reservationId + " status updated to " + newStatus);
        return true;
      }
    }
    return false;
  } catch (error) {
    Logger.log("❌ Error updating reservation: " + error);
    return false;
  }
}

function processCheckIn(reservationId) {
  try {
    const reservation = getReservation(reservationId);
    if (!reservation) {
      Logger.log("❌ Reservation not found: " + reservationId);
      return false;
    }
    
    updateReservationStatus(reservationId, "Checked-in");
    updateRoomStatus(reservation[4], "Occupied");
    addCheckIn(reservationId, reservation[1], reservation[4]);
    
    Logger.log("✅ Check-in processed for " + reservationId);
    return true;
  } catch (error) {
    Logger.log("❌ Error processing check-in: " + error);
    return false;
  }
}

function processCheckOut(roomNumber) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.RESERVATIONS);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][4] === roomNumber.toString() && data[i][11] === "Checked-in") {
        const reservationId = data[i][0];
        
        updateReservationStatus(reservationId, "Checked-out");
        updateRoomStatus(roomNumber, "Available");
        addCheckOut(reservationId, data[i][1], roomNumber);
        
        Logger.log("✅ Check-out processed for room " + roomNumber);
        return true;
      }
    }
    
    Logger.log("❌ No active reservation found for room " + roomNumber);
    return false;
  } catch (error) {
    Logger.log("❌ Error processing check-out: " + error);
    return false;
  }
}

function addCheckIn(reservationId, guestName, roomNumber) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.CHECKIN_CHECKOUT);
    const checkInTime = new Date();
    sheet.appendRow([reservationId, guestName, roomNumber, new Date(), "", checkInTime, "", "", "", "", "", ""]);
    Logger.log("✅ Check-in record added");
  } catch (error) {
    Logger.log("❌ Error adding check-in record: " + error);
  }
}

function addCheckOut(reservationId, guestName, roomNumber) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.CHECKIN_CHECKOUT);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === reservationId && data[i][1] === guestName) {
        sheet.getRange(i + 1, 7).setValue(new Date());
        Logger.log("✅ Check-out record updated");
        return;
      }
    }
  } catch (error) {
    Logger.log("❌ Error adding check-out record: " + error);
  }
}

// ============================================
// 5. GUEST FUNCTIONS
// ============================================

function addGuest(fullName, email, phone, address, city, country) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.GUESTS);
    
    const guestId = "G" + Date.now();
    const newRow = [guestId, fullName, email, phone, address, city, country, "", "", "", 0, 0, "", ""];
    sheet.appendRow(newRow);
    
    Logger.log("✅ Guest added: " + guestId);
    return guestId;
  } catch (error) {
    Logger.log("❌ Error adding guest: " + error);
    return null;
  }
}

function getGuest(guestId) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.GUESTS);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === guestId) {
        return data[i];
      }
    }
    return null;
  } catch (error) {
    Logger.log("❌ Error getting guest: " + error);
    return null;
  }
}

function searchGuestByName(name) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.GUESTS);
    const data = sheet.getDataRange().getValues();
    
    const results = [];
    for (let i = 1; i < data.length; i++) {
      if (data[i][1].toUpperCase().includes(name.toUpperCase())) {
        results.push(data[i]);
      }
    }
    return results;
  } catch (error) {
    Logger.log("❌ Error searching guest: " + error);
    return [];
  }
}

function updateGuestStats(guestId, amountSpent) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.GUESTS);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === guestId) {
        const currentStays = parseInt(data[i][10]) || 0;
        const currentSpent = parseFloat(data[i][11]) || 0;
        
        sheet.getRange(i + 1, 11).setValue(currentStays + 1);
        sheet.getRange(i + 1, 12).setValue(currentSpent + amountSpent);
        sheet.getRange(i + 1, 13).setValue(new Date());
        
        Logger.log("✅ Guest stats updated for " + guestId);
        return true;
      }
    }
    return false;
  } catch (error) {
    Logger.log("❌ Error updating guest stats: " + error);
    return false;
  }
}

// ============================================
// 6. ROOM FUNCTIONS
// ============================================

function addRoom(roomNumber, roomType, floor, capacity, amenities, rate, status) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.ROOMS);
    
    const newRow = [roomNumber, roomType, floor, capacity, amenities, rate, status || "Available", new Date(), "", ""];
    sheet.appendRow(newRow);
    
    Logger.log("✅ Room " + roomNumber + " added");
    return true;
  } catch (error) {
    Logger.log("❌ Error adding room: " + error);
    return false;
  }
}

function getRoom(roomNumber) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.ROOMS);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0].toString() === roomNumber.toString()) {
        return data[i];
      }
    }
    return null;
  } catch (error) {
    Logger.log("❌ Error getting room: " + error);
    return null;
  }
}

function updateRoomStatus(roomNumber, newStatus) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.ROOMS);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0].toString() === roomNumber.toString()) {
        sheet.getRange(i + 1, 7).setValue(newStatus);
        Logger.log("✅ Room " + roomNumber + " status updated to " + newStatus);
        return true;
      }
    }
    return false;
  } catch (error) {
    Logger.log("❌ Error updating room status: " + error);
    return false;
  }
}

function getAvailableRooms() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.ROOMS);
    const data = sheet.getDataRange().getValues();
    
    const availableRooms = [];
    for (let i = 1; i < data.length; i++) {
      if (data[i][6] && data[i][6].toString().toUpperCase() === "AVAILABLE") {
        availableRooms.push(data[i]);
      }
    }
    return availableRooms;
  } catch (error) {
    Logger.log("❌ Error getting available rooms: " + error);
    return [];
  }
}

// ============================================
// 7. HOUSEKEEPING FUNCTIONS
// ============================================

function createHousekeepingTask(roomNumber, status, assignedStaff, priority) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.HOUSEKEEPING);
    
    const newRow = [roomNumber, status || "Pending", assignedStaff || "", "", "", "Pending", "", "", new Date(), priority || "Normal"];
    sheet.appendRow(newRow);
    
    Logger.log("✅ Housekeeping task created for room " + roomNumber);
    return true;
  } catch (error) {
    Logger.log("❌ Error creating housekeeping task: " + error);
    return false;
  }
}

function updateHousekeepingStatus(roomNumber, newStatus) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.HOUSEKEEPING);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0].toString() === roomNumber.toString()) {
        sheet.getRange(i + 1, 6).setValue(newStatus);
        Logger.log("✅ Housekeeping task for room " + roomNumber + " updated to " + newStatus);
        return true;
      }
    }
    return false;
  } catch (error) {
    Logger.log("❌ Error updating housekeeping status: " + error);
    return false;
  }
}

function assignHousekeepingTask(roomNumber, staffName) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.HOUSEKEEPING);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0].toString() === roomNumber.toString()) {
        sheet.getRange(i + 1, 3).setValue(staffName);
        Logger.log("✅ Task assigned to " + staffName);
        return true;
      }
    }
    return false;
  } catch (error) {
    Logger.log("❌ Error assigning task: " + error);
    return false;
  }
}

function reportMaintenanceIssue(roomNumber, issue, priority) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.HOUSEKEEPING);
    
    const newRow = [roomNumber, "Maintenance", "", "", "", "Pending", issue, "Yes", new Date(), priority || "High"];
    sheet.appendRow(newRow);
    
    Logger.log("✅ Maintenance issue reported for room " + roomNumber);
    return true;
  } catch (error) {
    Logger.log("❌ Error reporting maintenance: " + error);
    return false;
  }
}

// ============================================
// 8. BILLING FUNCTIONS
// ============================================

function createInvoice(reservationId, guestName, roomNumber, checkInDate, checkOutDate, nights, rate, totalAmount) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.BILLING);
    
    const invoiceId = "INV" + Date.now();
    const newRow = [invoiceId, reservationId, guestName, roomNumber, checkInDate, checkOutDate, nights, rate, totalAmount, "Pending", "", totalAmount, ""];
    sheet.appendRow(newRow);
    
    Logger.log("✅ Invoice created: " + invoiceId);
    return invoiceId;
  } catch (error) {
    Logger.log("❌ Error creating invoice: " + error);
    return null;
  }
}

function updatePaymentStatus(invoiceId, paymentStatus, paymentDate) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.BILLING);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === invoiceId) {
        sheet.getRange(i + 1, 10).setValue(paymentStatus);
        sheet.getRange(i + 1, 11).setValue(paymentDate);
        sheet.getRange(i + 1, 12).setValue(0);
        Logger.log("✅ Payment status updated for " + invoiceId);
        return true;
      }
    }
    return false;
  } catch (error) {
    Logger.log("❌ Error updating payment status: " + error);
    return false;
  }
}

function getPendingPayments() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.BILLING);
    const data = sheet.getDataRange().getValues();
    
    const pendingPayments = [];
    for (let i = 1; i < data.length; i++) {
      if (data[i][9] && data[i][9].toString().toUpperCase() === "PENDING") {
        pendingPayments.push(data[i]);
      }
    }
    return pendingPayments;
  } catch (error) {
    Logger.log("❌ Error getting pending payments: " + error);
    return [];
  }
}

function calculateTotalRevenue() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.BILLING);
    const data = sheet.getDataRange().getValues();
    
    let total = 0;
    for (let i = 1; i < data.length; i++) {
      if (data[i][9] && data[i][9].toString().toUpperCase() === "PAID") {
        total += parseFloat(data[i][8]) || 0;
      }
    }
    return total;
  } catch (error) {
    Logger.log("❌ Error calculating total revenue: " + error);
    return 0;
  }
}

// ============================================
// 9. REPORTING FUNCTIONS
// ============================================

function getOccupancyReport(startDate, endDate) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const reservationSheet = ss.getSheetByName(CONFIG.SHEETS.RESERVATIONS);
    const reservationData = reservationSheet.getDataRange().getValues();
    const totalRooms = CONFIG.TOTAL_ROOMS;
    
    let totalOccupiedDays = 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalRoomDays = totalRooms * daysDiff;
    
    for (let i = 1; i < reservationData.length; i++) {
      const checkInDate = new Date(reservationData[i][2]);
      const checkOutDate = new Date(reservationData[i][3]);
      
      if (checkInDate >= start && checkOutDate <= end) {
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        totalOccupiedDays += nights;
      }
    }
    
    const occupancyRate = ((totalOccupiedDays / totalRoomDays) * 100).toFixed(2);
    
    return {
      occupancyRate: occupancyRate,
      totalOccupiedDays: totalOccupiedDays,
      totalRoomDays: totalRoomDays,
      startDate: startDate,
      endDate: endDate
    };
  } catch (error) {
    Logger.log("❌ Error generating occupancy report: " + error);
    return null;
  }
}

function getRevenueReport(startDate, endDate) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const billingSheet = ss.getSheetByName(CONFIG.SHEETS.BILLING);
    const billingData = billingSheet.getDataRange().getValues();
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    let totalRevenue = 0;
    let totalInvoices = 0;
    let paidInvoices = 0;
    
    for (let i = 1; i < billingData.length; i++) {
      const invoiceDate = new Date(billingData[i][4]);
      
      if (invoiceDate >= start && invoiceDate <= end) {
        totalInvoices++;
        
        if (billingData[i][9] && billingData[i][9].toString().toUpperCase() === "PAID") {
          totalRevenue += parseFloat(billingData[i][8]) || 0;
          paidInvoices++;
        }
      }
    }
    
    const avgRevenuePerInvoice = totalInvoices > 0 ? (totalRevenue / totalInvoices).toFixed(2) : 0;
    
    return {
      totalRevenue: totalRevenue.toFixed(2),
      totalInvoices: totalInvoices,
      paidInvoices: paidInvoices,
      avgRevenuePerInvoice: avgRevenuePerInvoice,
      startDate: startDate,
      endDate: endDate
    };
  } catch (error) {
    Logger.log("❌ Error generating revenue report: " + error);
    return null;
  }
}

function getGuestStatistics() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const guestSheet = ss.getSheetByName(CONFIG.SHEETS.GUESTS);
    const guestData = guestSheet.getDataRange().getValues();
    
    let totalGuests = guestData.length - 1;
    let repeatGuests = 0;
    let totalSpent = 0;
    
    for (let i = 1; i < guestData.length; i++) {
      const stays = parseInt(guestData[i][10]) || 0;
      if (stays > 1) {
        repeatGuests++;
      }
      totalSpent += parseFloat(guestData[i][11]) || 0;
    }
    
    return {
      totalGuests: totalGuests,
      repeatGuests: repeatGuests,
      totalSpent: totalSpent.toFixed(2),
      avgSpentPerGuest: totalGuests > 0 ? (totalSpent / totalGuests).toFixed(2) : 0
    };
  } catch (error) {
    Logger.log("❌ Error generating guest statistics: " + error);
    return null;
  }
}

// ============================================
// 10. DIALOG FUNCTIONS
// ============================================

function openCheckInDialog() {
  const htmlContent = '<style>body { font-family: Arial; padding: 20px; } input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px; } button { width: 100%; padding: 12px; background: #4285F4; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; } button:hover { background: #1a73e8; }</style><h2>Check-in Guest</h2><p>Enter Reservation ID to check in:</p><input type="text" id="reservationId" placeholder="e.g., RES123456" /><button onclick="checkIn()">Check-in</button><script>function checkIn() { const resId = document.getElementById("reservationId").value; if (!resId) { alert("Please enter Reservation ID"); return; } google.script.run.processCheckIn(resId); google.script.host.close(); }</script>';
  const html = HtmlService.createHtmlOutput(htmlContent);
  SpreadsheetApp.getUi().showModalDialog(html, "Check-in Guest");
}

function openCheckOutDialog() {
  const htmlContent = '<style>body { font-family: Arial; padding: 20px; } input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px; } button { width: 100%; padding: 12px; background: #4285F4; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; } button:hover { background: #1a73e8; }</style><h2>Check-out Guest</h2><p>Enter Room Number to check out:</p><input type="text" id="roomNumber" placeholder="e.g., 101" /><button onclick="checkOut()">Check-out</button><script>function checkOut() { const room = document.getElementById("roomNumber").value; if (!room) { alert("Please enter Room Number"); return; } google.script.run.processCheckOut(room); google.script.host.close(); }</script>';
  const html = HtmlService.createHtmlOutput(htmlContent);
  SpreadsheetApp.getUi().showModalDialog(html, "Check-out Guest");
}

function openNewReservationDialog() {
  const htmlContent = '<style>body { font-family: Arial; padding: 20px; } input, select { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; } button { width: 100%; padding: 12px; background: #4285F4; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; } button:hover { background: #1a73e8; } label { font-weight: bold; display: block; margin-top: 10px; }</style><h2>New Reservation</h2><label>Guest Name:</label><input type="text" id="guestName" placeholder="Full Name" /><label>Check-in Date:</label><input type="date" id="checkInDate" /><label>Check-out Date:</label><input type="date" id="checkOutDate" /><label>Room Number:</label><input type="text" id="roomNumber" placeholder="e.g., 101" /><label>Room Type:</label><select id="roomType"><option value="">Select Room Type</option><option value="Standard">Standard</option><option value="Deluxe">Deluxe</option><option value="Suite">Suite</option></select><label>Rate per Night:</label><input type="number" id="rate" placeholder="2500" /><button onclick="createRes()">Create Reservation</button><script>function createRes() { const gName = document.getElementById("guestName").value; const cIn = document.getElementById("checkInDate").value; const cOut = document.getElementById("checkOutDate").value; const room = document.getElementById("roomNumber").value; const rType = document.getElementById("roomType").value; const rate = document.getElementById("rate").value; if (!gName || !cIn || !cOut || !room || !rType || !rate) { alert("Please fill all fields"); return; } google.script.run.addReservation(gName, cIn, cOut, room, rType, parseFloat(rate)); alert("Reservation created successfully!"); google.script.host.close(); }</script>';
  const html = HtmlService.createHtmlOutput(htmlContent);
  SpreadsheetApp.getUi().showModalDialog(html, "New Reservation");
}

function openNewGuestDialog() {
  const htmlContent = '<style>body { font-family: Arial; padding: 20px; } input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; } button { width: 100%; padding: 12px; background: #4285F4; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; } button:hover { background: #1a73e8; } label { font-weight: bold; display: block; margin-top: 10px; }</style><h2>New Guest</h2><label>Full Name:</label><input type="text" id="fullName" placeholder="Full Name" /><label>Email:</label><input type="email" id="email" placeholder="email@example.com" /><label>Phone:</label><input type="tel" id="phone" placeholder="9876543210" /><label>City:</label><input type="text" id="city" placeholder="City" /><label>Country:</label><input type="text" id="country" placeholder="Country" /><button onclick="createGuest()">Add Guest</button><script>function createGuest() { const name = document.getElementById("fullName").value; const email = document.getElementById("email").value; const phone = document.getElementById("phone").value; const city = document.getElementById("city").value; const country = document.getElementById("country").value; if (!name || !email || !phone) { alert("Please fill required fields"); return; } google.script.run.addGuest(name, email, phone, "", city, country); alert("Guest added successfully!"); google.script.host.close(); }</script>';
  const html = HtmlService.createHtmlOutput(htmlContent);
  SpreadsheetApp.getUi().showModalDialog(html, "New Guest");
}

function openPaymentDialog() {
  const htmlContent = '<style>body { font-family: Arial; padding: 20px; } input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; } button { width: 100%; padding: 12px; background: #4285F4; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; } button:hover { background: #1a73e8; } label { font-weight: bold; display: block; margin-top: 10px; }</style><h2>Add Payment</h2><label>Invoice ID:</label><input type="text" id="invoiceId" placeholder="e.g., INV123456" /><label>Amount:</label><input type="number" id="amount" placeholder="0.00" /><button onclick="addPayment()">Add Payment</button><script>function addPayment() { const invId = document.getElementById("invoiceId").value; const amount = document.getElementById("amount").value; if (!invId || !amount) { alert("Please fill all fields"); return; } google.script.run.updatePaymentStatus(invId, "Paid", new Date()); alert("Payment recorded successfully!"); google.script.host.close(); }</script>';
  const html = HtmlService.createHtmlOutput(htmlContent);
  SpreadsheetApp.getUi().showModalDialog(html, "Add Payment");
}

function openMaintenanceDialog() {
  const htmlContent = '<style>body { font-family: Arial; padding: 20px; } input, select, textarea { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; font-family: Arial; } button { width: 100%; padding: 12px; background: #4285F4; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; } button:hover { background: #1a73e8; } label { font-weight: bold; display: block; margin-top: 10px; }</style><h2>Report Maintenance</h2><label>Room Number:</label><input type="text" id="roomNumber" placeholder="e.g., 101" /><label>Issue Description:</label><textarea id="issue" placeholder="Describe the maintenance issue" rows="4"></textarea><label>Priority:</label><select id="priority"><option value="Normal">Normal</option><option value="High">High</option><option value="Urgent">Urgent</option></select><button onclick="reportMaintenance()">Report Maintenance</button><script>function reportMaintenance() { const room = document.getElementById("roomNumber").value; const issue = document.getElementById("issue").value; const priority = document.getElementById("priority").value; if (!room || !issue) { alert("Please fill all fields"); return; } google.script.run.reportMaintenanceIssue(room, issue, priority); alert("Maintenance issue reported successfully!"); google.script.host.close(); }</script>';
  const html = HtmlService.createHtmlOutput(htmlContent);
  SpreadsheetApp.getUi().showModalDialog(html, "Report Maintenance");
}

// ============================================
// 11. REPORTING & NIGHT AUDIT
// ============================================

function generateReports() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const reportsSheet = ss.getSheetByName(CONFIG.SHEETS.REPORTS);
    const roomsSheet = ss.getSheetByName(CONFIG.SHEETS.ROOMS);
    const billingSheet = ss.getSheetByName(CONFIG.SHEETS.BILLING);
    
    const roomsData = roomsSheet.getDataRange().getValues();
    const billingData = billingSheet.getDataRange().getValues();
    
    const occupiedRooms = countOccupiedRooms(roomsData);
    const totalRooms = CONFIG.TOTAL_ROOMS;
    const occupancyRate = ((occupiedRooms / totalRooms) * 100).toFixed(1);
    const todayRevenue = calculateTodayRevenue(billingData);
    
    const report = [
      ["Report Type", "Daily Report"],
      ["Date", new Date().toDateString()],
      ["Occupancy Rate", occupancyRate + "%"],
      ["Today Revenue", "₹" + todayRevenue.toFixed(2)],
      ["Total Rooms", totalRooms],
      ["Occupied", occupiedRooms],
      ["Vacant", totalRooms - occupiedRooms],
    ];
    
    reportsSheet.clearContents();
    reportsSheet.getRange(1, 1, report.length, 2).setValues(report);
    
    SpreadsheetApp.getUi().alert("✅ Report generated successfully!");
    Logger.log("✅ Report generated");
  } catch (error) {
    Logger.log("❌ Error generating reports: " + error);
  }
}

function nightAudit() {
  Logger.log("🌙 Running Night Audit...");
  
  try {
    updateDashboard();
    sendDailyReport();
    Logger.log("✅ Night Audit Complete");
  } catch (error) {
    Logger.log("❌ Error during night audit: " + error);
  }
}

function sendDailyReport() {
  Logger.log("📧 Sending Daily Report...");
  
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const roomsSheet = ss.getSheetByName(CONFIG.SHEETS.ROOMS);
    const billingSheet = ss.getSheetByName(CONFIG.SHEETS.BILLING);
    
    const roomsData = roomsSheet.getDataRange().getValues();
    const billingData = billingSheet.getDataRange().getValues();
    
    const occupiedRooms = countOccupiedRooms(roomsData);
    const totalRooms = CONFIG.TOTAL_ROOMS;
    const occupancyRate = ((occupiedRooms / totalRooms) * 100).toFixed(1);
    const todayRevenue = calculateTodayRevenue(billingData);
    
    Logger.log("✅ Daily Report Generated - Occupancy: " + occupancyRate + "%, Revenue: " + todayRevenue);
  } catch (error) {
    Logger.log("❌ Error sending daily report: " + error);
  }
}

// ============================================
// 12. SETTINGS & HELP
// ============================================

function openSettings() {
  const htmlContent = '<style>body { font-family: Arial; padding: 20px; } .setting { margin: 15px 0; } strong { display: block; margin-bottom: 5px; }</style><h2>Settings</h2><div class="setting"><strong>Property Name:</strong>' + CONFIG.PROPERTY_NAME + '</div><div class="setting"><strong>Total Rooms:</strong>' + CONFIG.TOTAL_ROOMS + '</div><div class="setting"><strong>Timezone:</strong>' + CONFIG.TIMEZONE + '</div><div class="setting"><strong>Admin Email:</strong>' + CONFIG.ADMIN_EMAIL + '</div>';
  const html = HtmlService.createHtmlOutput(htmlContent);
  SpreadsheetApp.getUi().showModalDialog(html, "Settings");
}

function showHelp() {
  const htmlContent = '<style>body { font-family: Arial; padding: 20px; } h3 { color: #4285F4; margin-top: 15px; } p { line-height: 1.6; }</style><h2>PMS System Help</h2><h3>Dashboard</h3><p>Real-time overview of your property with key metrics.</p><h3>Reservations</h3><p>Manage guest bookings, check-in dates, and room assignments.</p><h3>Guests</h3><p>Guest profiles, contact details, and stay history.</p><h3>Rooms</h3><p>Room inventory, types, rates, and current status.</p><h3>Housekeeping</h3><p>Room cleaning schedules and staff assignments.</p><h3>Billing</h3><p>Invoices, payments, and guest billing information.</p><h3>Reports</h3><p>Analytics, occupancy rates, and revenue reports.</p><h3>Getting Started</h3><p>1. Click on PMS menu<br/>2. Select your desired function<br/>3. Fill in the required information<br/>4. Submit and the system will update automatically</p>';
  const html = HtmlService.createHtmlOutput(htmlContent);
  SpreadsheetApp.getUi().showModalDialog(html, "Help");
}

// ============================================
// DONE - CODE COMPLETE & READY TO USE
// ============================================
