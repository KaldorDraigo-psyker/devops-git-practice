/**
 * Test suite for TaskManager class
 * Run these tests to verify TaskManager functionality
 */

class TaskManagerTests {
    constructor() {
        this.taskManager = new TaskManager();
        this.testResults = [];
    }

    /**
     * Run all tests
     */
    runAllTests() {
        console.log('🧪 Running TaskManager Tests...\n');
        
        this.testAddTask();
        this.testCompleteTask();
        this.testDeleteTask();
        this.testGetTasks();
        this.testGetStats();
        this.testGetTasksByPriority();
        this.testErrorHandling();
        
        this.printResults();
    }

    /**
     * Test task addition functionality
     */
    testAddTask() {
        console.log('Testing addTask...');
        
        // Test 1: Add a basic task
        const task1 = this.taskManager.addTask('Test Task', 'Test Description', 'high');
        this.assert(task1.id === 1, 'Task should have ID 1');
        this.assert(task1.title === 'Test Task', 'Task title should match');
        this.assert(task1.priority === 'high', 'Task priority should be high');
        this.assert(task1.status === 'pending', 'New task should be pending');
        
        // Test 2: Add task with default values
        const task2 = this.taskManager.addTask('Another Task');
        this.assert(task2.id === 2, 'Second task should have ID 2');
        this.assert(task2.priority === 'medium', 'Default priority should be medium');
        this.assert(task2.description === '', 'Default description should be empty');
        
        // Test 3: Test error handling for empty title
        try {
            this.taskManager.addTask('');
            this.assert(false, 'Should throw error for empty title');
        } catch (error) {
            this.assert(error.message === 'Task title is required', 'Should throw correct error message');
        }
        
        console.log('✅ addTask tests passed\n');
    }

    /**
     * Test task completion functionality
     */
    testCompleteTask() {
        console.log('Testing completeTask...');
        
        // Test 1: Complete existing task
        const result1 = this.taskManager.completeTask(1);
        this.assert(result1 === true, 'Should return true for existing task');
        
        const task = this.taskManager.getTaskById(1);
        this.assert(task.status === 'completed', 'Task status should be completed');
        this.assert(task.completedAt !== null, 'Task should have completion date');
        
        // Test 2: Try to complete non-existent task
        const result2 = this.taskManager.completeTask(999);
        this.assert(result2 === false, 'Should return false for non-existent task');
        
        console.log('✅ completeTask tests passed\n');
    }

    /**
     * Test task deletion functionality
     */
    testDeleteTask() {
        console.log('Testing deleteTask...');
        
        const initialCount = this.taskManager.getTasks().length;
        
        // Test 1: Delete existing task
        const result1 = this.taskManager.deleteTask(2);
        this.assert(result1 === true, 'Should return true for existing task');
        this.assert(this.taskManager.getTasks().length === initialCount - 1, 'Task count should decrease');
        
        // Test 2: Try to delete non-existent task
        const result2 = this.taskManager.deleteTask(999);
        this.assert(result2 === false, 'Should return false for non-existent task');
        
        console.log('✅ deleteTask tests passed\n');
    }

    /**
     * Test task filtering functionality
     */
    testGetTasks() {
        console.log('Testing getTasks...');
        
        // Add some test tasks
        this.taskManager.addTask('Pending Task 1', '', 'low');
        this.taskManager.addTask('Pending Task 2', '', 'medium');
        this.taskManager.addTask('Completed Task', '', 'high');
        this.taskManager.completeTask(4); // Complete the last task
        
        // Test 1: Get all tasks
        const allTasks = this.taskManager.getTasks('all');
        this.assert(allTasks.length >= 3, 'Should return all tasks');
        
        // Test 2: Get pending tasks
        const pendingTasks = this.taskManager.getTasks('pending');
        this.assert(pendingTasks.length >= 2, 'Should return pending tasks');
        this.assert(pendingTasks.every(t => t.status === 'pending'), 'All returned tasks should be pending');
        
        // Test 3: Get completed tasks
        const completedTasks = this.taskManager.getTasks('completed');
        this.assert(completedTasks.length >= 1, 'Should return completed tasks');
        this.assert(completedTasks.every(t => t.status === 'completed'), 'All returned tasks should be completed');
        
        console.log('✅ getTasks tests passed\n');
    }

    /**
     * Test statistics functionality
     */
    testGetStats() {
        console.log('Testing getStats...');
        
        const stats = this.taskManager.getStats();
        this.assert(typeof stats.total === 'number', 'Stats should have total count');
        this.assert(typeof stats.completed === 'number', 'Stats should have completed count');
        this.assert(typeof stats.pending === 'number', 'Stats should have pending count');
        this.assert(typeof stats.completionRate === 'number', 'Stats should have completion rate');
        this.assert(stats.total === stats.completed + stats.pending, 'Total should equal completed + pending');
        
        console.log('✅ getStats tests passed\n');
    }

    /**
     * Test priority sorting functionality
     */
    testGetTasksByPriority() {
        console.log('Testing getTasksByPriority...');
        
        const sortedTasks = this.taskManager.getTasksByPriority('desc');
        this.assert(Array.isArray(sortedTasks), 'Should return an array');
        
        // Check if tasks are sorted by priority (high to low)
        for (let i = 0; i < sortedTasks.length - 1; i++) {
            const currentPriority = sortedTasks[i].priority;
            const nextPriority = sortedTasks[i + 1].priority;
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            
            this.assert(
                priorityOrder[currentPriority] >= priorityOrder[nextPriority],
                'Tasks should be sorted by priority (high to low)'
            );
        }
        
        console.log('✅ getTasksByPriority tests passed\n');
    }

    /**
     * Test error handling
     */
    testErrorHandling() {
        console.log('Testing error handling...');
        
        // Test invalid priority
        const task = this.taskManager.addTask('Test Task', '', 'invalid');
        this.assert(task.priority === 'invalid', 'Should accept any priority value');
        
        // Test getTaskById with invalid ID
        const nonExistentTask = this.taskManager.getTaskById(999);
        this.assert(nonExistentTask === null, 'Should return null for non-existent task');
        
        console.log('✅ error handling tests passed\n');
    }

    /**
     * Assert helper method
     */
    assert(condition, message) {
        if (condition) {
            this.testResults.push({ status: 'PASS', message });
        } else {
            this.testResults.push({ status: 'FAIL', message });
            console.error(`❌ FAIL: ${message}`);
        }
    }

    /**
     * Print test results summary
     */
    printResults() {
        const passed = this.testResults.filter(r => r.status === 'PASS').length;
        const failed = this.testResults.filter(r => r.status === 'FAIL').length;
        
        console.log('\n📊 Test Results Summary:');
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
        
        if (failed === 0) {
            console.log('\n🎉 All tests passed! TaskManager is working correctly.');
        } else {
            console.log('\n⚠️  Some tests failed. Please check the implementation.');
        }
    }
}

// Auto-run tests when this file is loaded
if (typeof window !== 'undefined') {
    // Browser environment
    window.TaskManagerTests = TaskManagerTests;
    console.log('TaskManager tests loaded. Run "new TaskManagerTests().runAllTests()" to execute tests.');
} else {
    // Node.js environment
    module.exports = TaskManagerTests;
}
