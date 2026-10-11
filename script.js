// استبدل هذه القيم ببيانات مشروعك المجاني على Supabase
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// دالة جلب المعاملات من قاعدة البيانات السحابية وتحديث الجدول على الموبايل والكمبيوتر
async function fetchTasks() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/tasks?select=*`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('خطأ في جلب البيانات من السحابة:', error);
    }
}

// دالة عرض المعاملات في الجدول المتجاوب (Responsive Table)
function renderTasks(tasks) {
    const taskTableBody = document.getElementById('taskTableBody');
    taskTableBody.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>#${501 + index}</td>
            <td>${task.title}</td>
            <td>${task.branch}</td>
            <td>${task.deadline}</td>
            <td><span class="badge ${task.status === 'pending' ? 'warning' : 'danger'}">${task.status === 'pending' ? 'في الانتظار' : 'فائت (Deadline)'}</span></td>
            <td><button class="btn-sm" onclick="reviewTask('${task.id}')">مراجعة</button></td>
        `;
        taskTableBody.appendChild(newRow);
    });
}

// إرسال معاملة جديدة (Template) إلى السحابة فوراً لتظهر عند العميد الرئيسي وباقي الفروع
document.getElementById('templateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('titleInput').value;
    const branch = document.getElementById('branchInput').value;
    const deadline = document.getElementById('deadlineInput').value;
    const desc = document.getElementById('descInput').value;

    const newTask = {
        title: title,
        branch: branch,
        deadline: deadline,
        description: desc,
        status: 'pending'
    };

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(newTask)
        });

        if (response.ok) {
            alert('تم حفظ وإرسال المعاملة بنجاح عبر السحابة لجميع الفروع!');
            document.getElementById('templateForm').reset();
            document.getElementById('taskModal').style.display = 'none';
            fetchTasks(); // تحديث الجدول فوراً
        } else {
            alert('حدث خطأ أثناء الحفظ.');
        }
    } catch (error) {
        console.error('خطأ في الاتصال:', error);
    }
});

// فتح وإغلاق النافذة المنبثقة
const modal = document.getElementById('taskModal');
document.getElementById('openModalBtn').addEventListener('click', () => { modal.style.display = 'flex'; });
document.getElementById('closeModalBtn').addEventListener('click', () => { modal.style.display = 'none'; });

// تحميل البيانات تلقائياً عند فتح الصفحة
window.onload = fetchTasks;