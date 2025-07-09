// Authentication utility functions
function storeUser(userData) {
  try {
    localStorage.setItem('studentfund_user', JSON.stringify(userData));
  } catch (error) {
    console.error('Failed to store user data:', error);
  }
}

function getStoredUser() {
  try {
    const userData = localStorage.getItem('studentfund_user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Failed to get user data:', error);
    return null;
  }
}

function clearStoredUser() {
  try {
    localStorage.removeItem('studentfund_user');
  } catch (error) {
    console.error('Failed to clear user data:', error);
  }
}