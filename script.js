// إدارة الصلاحيات وتسجيل الدخول الوهمي لاختبار النظام
function loginAs(role) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appContainer').style.display = 'flex';

    const welcomeText = document.getElementById('welcomeText');
    const roleBadge = document.getElementById('roleBadge');
    const userRoleTitle = document.getElementById('userRoleTitle');
    const branchesNav = document.getElementById('branchesNav');
    const tableTitle = document.getElementById('tableTitle');

    if (role === 'super_dean') {
        welcomeText.innerHTML = 'مرحباً، <strong>العميد الرئيسي</strong>';
        roleBadge.innerText = 'صلاحية شاملة (إشراف 5 فروع)';
        userRoleTitle.innerText = 'مكتب العميد الرئيسي';
        branchesNav.style.display = 'block';
        tableTitle.innerText = 'متابعة شاملة لجميع مكاتب العمداء والفروع الأربعة';
    } else if (role === 'branch_dean') {
        welcomeText.innerHTML = 'مرحباً، <strong>عميد الفرع</strong>';
        roleBadge.innerText = 'صلاحية فرع المحافظة';
        userRoleTitle.innerText = 'مكتب عميد الفرع';
        branchesNav.style.display = 'none';
        tableTitle.innerText = 'معاملات فرع المحافظة والوكلاء التابعين';
    } else if (role === 'department_head') {
        welcomeText.innerHTML = 'مرحباً، <strong>رئيس القسم / وكيل</strong>';
        roleBadge.innerText = 'صلاحية إدخال Templates';
        userRoleTitle.innerText = 'إدارة الأقسام';
        branchesNav.style.display = 'none';
        tableTitle.innerText = 'معاملات القسم والـ Deadlines الخاصة بي';
    }
}

function logout() {
    document.getElementById('appContainer').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';
}

// التحكم بالنافذة المنبثقة للـ Templates
const modal = document.getElementById('taskModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const templateForm = document.getElementById('templateForm');
const taskTableBody = document.getElementById('taskTableBody');

openModalBtn.addEventListener('click', () => { modal.style.display = 'flex'; });
closeModalBtn.addEventListener('click', () => { modal.style.display = 'none'; });
window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

templateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('titleInput').value;
    const branch = document.getElementById('branchInput').value;
    const deadline = document.getElementById('deadlineInput').value;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>#502</td>
        <td>${title}</td>
        <td>${branch}</td>
        <td>${deadline}</td>
        <td><span class="badge warning">في الانتظار</span></td>
        <td><button class="btn-sm">مراجعة القرار</button></td>
    `;
    taskTableBody.appendChild(newRow);
    templateForm.reset();
    modal.style.display = 'none';
    alert('تم إرسال المعاملة عبر Template المخصصة بنجاح!');
});
