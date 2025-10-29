export function generateNumericId() {
    return Number(`${Date.now()}${Math.floor(Math.random() * 900 + 100)}`);
  }
  