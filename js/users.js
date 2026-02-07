// ================== AUTH TOKEN ==================
const usersToken = localStorage.getItem('token');

if (!usersToken || usersToken === 'undefined') {
  console.error('Admin token not found. Users cannot be loaded.');
}

// ================== PAGINATION RENDER ==================
function renderUserPagination(page, totalPages) {
  const pagination = document.getElementById("users-pagination");
  if (!pagination) return;
  pagination.innerHTML = "";

  // Ensure at least 1 page is recognized
  if (!totalPages) totalPages = 1;

  // Previous button
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Prev";
  prevBtn.disabled = page === 1;
  prevBtn.onclick = () => loadUsers(page - 1);
  pagination.appendChild(prevBtn);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = page === i ? "active" : "";
    btn.onclick = () => loadUsers(i);
    pagination.appendChild(btn);
  }

  // Next button
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = page === totalPages;
  nextBtn.onclick = () => loadUsers(page + 1);
  pagination.appendChild(nextBtn);
}

// ================== LOAD USERS ==================
async function loadUsers(page = 1) {
  if (!usersToken || usersToken === 'undefined') return;

  try {
    const res = await fetch(`/api/users?page=${page}&limit=10`, {
      headers: {
        Authorization: `Bearer ${usersToken}`,
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Fetch failed: ${res.status} ${errText}`);
    }

    const result = await res.json();
    // Handle both paginated { data: [...] } and flat [...] responses
    const users = result.data || (Array.isArray(result) ? result : []);
    const totalPages = result.totalPages || 0;
    const currentPage = result.page || 1;
    const tbody = document.querySelector("#users-table tbody");

    if (!tbody) return;
    tbody.innerHTML = "";

    if (!users || users.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align:center;">No users found</td>
        </tr>
      `;
      return;
    }

    users.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${new Date(user.created_at).toLocaleDateString()}</td>
      `;
      tbody.appendChild(row);
    });

    // Render pagination
    renderUserPagination(currentPage, totalPages);

  } catch (err) {
    console.error('Failed to load users:', err);
    const tbody = document.querySelector("#users-table tbody");
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align:center; color: red;">Failed to load users.</td>
        </tr>
      `;
    }
  }
}

// ================== INIT ==================
window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('users-table')) {
    loadUsers();
  }
});
