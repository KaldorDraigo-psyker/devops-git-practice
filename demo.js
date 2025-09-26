/**
 * Demo script for TaskManager functionality
 * Demonstrates all features of the TaskManager class
 */

function runTaskManagerDemo() {
    console.log('🚀 TaskManager Demo Starting...\n');
    
    // Create a new TaskManager instance
    const taskManager = new TaskManager();
    
    // Demo 1: Adding tasks
    console.log('📝 Adding tasks...');
    const task1 = taskManager.addTask('Learn JavaScript', 'Complete JavaScript fundamentals course', 'high');
    const task2 = taskManager.addTask('Buy groceries', 'Milk, bread, eggs, and vegetables', 'medium');
    const task3 = taskManager.addTask('Read book', 'Finish reading "Clean Code"', 'low');
    const task4 = taskManager.addTask('Exercise', 'Go for a 30-minute run');
    
    console.log(`✅ Added ${taskManager.getTasks().length} tasks\n`);
    
    // Demo 2: Displaying all tasks
    console.log('📋 All tasks:');
    taskManager.getTasks().forEach(task => {
        console.log(`  ${task.id}. [${task.priority.toUpperCase()}] ${task.title} - ${task.status}`);
    });
    console.log();
    
    // Demo 3: Completing a task
    console.log('✅ Completing task 1...');
    taskManager.completeTask(1);
    console.log(`Task 1 status: ${taskManager.getTaskById(1).status}\n`);
    
    // Demo 4: Filtering tasks by status
    console.log('🔍 Pending tasks:');
    taskManager.getTasks('pending').forEach(task => {
        console.log(`  ${task.id}. ${task.title}`);
    });
    console.log();
    
    console.log('✅ Completed tasks:');
    taskManager.getTasks('completed').forEach(task => {
        console.log(`  ${task.id}. ${task.title}`);
    });
    console.log();
    
    // Demo 5: Task statistics
    console.log('📊 Task Statistics:');
    const stats = taskManager.getStats();
    console.log(`  Total tasks: ${stats.total}`);
    console.log(`  Completed: ${stats.completed}`);
    console.log(`  Pending: ${stats.pending}`);
    console.log(`  Completion rate: ${stats.completionRate}%\n`);
    
    // Demo 6: Tasks sorted by priority
    console.log('🎯 Tasks sorted by priority (high to low):');
    taskManager.getTasksByPriority('desc').forEach(task => {
        console.log(`  [${task.priority.toUpperCase()}] ${task.title}`);
    });
    console.log();
    
    // Demo 7: Deleting a task
    console.log('🗑️  Deleting task 3...');
    const deleted = taskManager.deleteTask(3);
    console.log(`Task deleted: ${deleted}`);
    console.log(`Remaining tasks: ${taskManager.getTasks().length}\n`);
    
    // Demo 8: Final state
    console.log('📋 Final task list:');
    taskManager.getTasks().forEach(task => {
        const status = task.status === 'completed' ? '✅' : '⏳';
        console.log(`  ${status} ${task.title} [${task.priority}]`);
    });
    
    console.log('\n🎉 TaskManager Demo Complete!');
}

// Run demo if in browser environment
if (typeof window !== 'undefined') {
    window.runTaskManagerDemo = runTaskManagerDemo;
    console.log('TaskManager demo loaded. Run "runTaskManagerDemo()" to see the demo.');
}
