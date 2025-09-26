/**
 * Test suite for StorageManager and PersistentTaskManager
 * Tests localStorage functionality and data persistence
 */

class StorageTests {
    constructor() {
        this.storageManager = new StorageManager('test-storage');
        this.persistentTaskManager = new PersistentTaskManager('test-persistent');
        this.testResults = [];
    }

    /**
     * Run all storage tests
     */
    runAllTests() {
        console.log('🧪 Running Storage Tests...\n');
        
        this.testStorageAvailability();
        this.testSaveAndLoad();
        this.testDataIntegrity();
        this.testExportImport();
        this.testBackupRestore();
        this.testPersistentTaskManager();
        this.testErrorHandling();
        
        this.printResults();
        this.cleanup();
    }

    /**
     * Test storage availability
     */
    testStorageAvailability() {
        console.log('Testing storage availability...');
        
        const isAvailable = this.storageManager.isAvailable;
        this.assert(isAvailable === true, 'localStorage should be available');
        
        const storageInfo = this.storageManager.getStorageInfo();
        this.assert(storageInfo.available === true, 'Storage info should indicate availability');
        
        console.log('✅ Storage availability tests passed\n');
    }

    /**
     * Test save and load functionality
     */
    testSaveAndLoad() {
        console.log('Testing save and load...');
        
        const testData = {
            tasks: [
                { id: 1, title: 'Test Task', priority: 'high', status: 'pending' },
                { id: 2, title: 'Another Task', priority: 'medium', status: 'completed' }
            ],
            nextId: 3,
            timestamp: new Date().toISOString()
        };

        // Test save
        const saveResult = this.storageManager.save(testData);
        this.assert(saveResult === true, 'Save should return true');

        // Test load
        const loadedData = this.storageManager.load();
        this.assert(loadedData !== null, 'Loaded data should not be null');
        this.assert(loadedData.tasks.length === 2, 'Should load correct number of tasks');
        this.assert(loadedData.nextId === 3, 'Should load correct nextId');

        // Test clear
        const clearResult = this.storageManager.clear();
        this.assert(clearResult === true, 'Clear should return true');

        const clearedData = this.storageManager.load();
        this.assert(clearedData === null, 'Data should be null after clear');

        console.log('✅ Save and load tests passed\n');
    }

    /**
     * Test data integrity
     */
    testDataIntegrity() {
        console.log('Testing data integrity...');
        
        const testData = {
            tasks: [
                { id: 1, title: 'Valid Task', priority: 'high', status: 'pending' },
                { id: 2, title: '', priority: 'invalid', status: 'unknown' }, // Invalid task
                { id: 3, title: 'Another Valid Task', priority: 'medium', status: 'completed' }
            ],
            nextId: 4
        };

        this.storageManager.save(testData);
        this.persistentTaskManager.loadData();
        
        const integrityReport = this.persistentTaskManager.getDataIntegrityReport();
        this.assert(integrityReport.totalTasks === 3, 'Should report correct total tasks');
        this.assert(integrityReport.validTasks === 2, 'Should identify valid tasks');
        this.assert(integrityReport.invalidTasks === 1, 'Should identify invalid tasks');
        this.assert(integrityReport.issues.length === 1, 'Should report issues');

        console.log('✅ Data integrity tests passed\n');
    }

    /**
     * Test export and import functionality
     */
    testExportImport() {
        console.log('Testing export and import...');
        
        const testData = {
            tasks: [
                { id: 1, title: 'Export Test', priority: 'high', status: 'pending' }
            ],
            nextId: 2
        };

        // Test export (we can't easily test file download in this environment)
        const exportResult = this.storageManager.exportData(testData, 'test-export.json');
        this.assert(exportResult === true, 'Export should return true');

        // Test import with mock file
        const mockFile = new Blob([JSON.stringify(testData)], { type: 'application/json' });
        mockFile.name = 'test-import.json';
        
        this.storageManager.importData(mockFile).then(importedData => {
            this.assert(importedData !== null, 'Import should return data');
            this.assert(importedData.tasks.length === 1, 'Should import correct number of tasks');
        });

        console.log('✅ Export and import tests passed\n');
    }

    /**
     * Test backup and restore functionality
     */
    testBackupRestore() {
        console.log('Testing backup and restore...');
        
        const testData = {
            tasks: [
                { id: 1, title: 'Backup Test', priority: 'medium', status: 'pending' }
            ],
            nextId: 2
        };

        this.storageManager.save(testData);
        
        // Test backup creation
        const backup = this.storageManager.createBackup();
        this.assert(backup !== null, 'Backup should not be null');
        this.assert(backup.timestamp !== undefined, 'Backup should have timestamp');
        this.assert(backup.data.tasks.length === 1, 'Backup should contain correct data');

        // Clear data
        this.storageManager.clear();
        this.assert(this.storageManager.load() === null, 'Data should be cleared');

        // Test restore
        const restoreResult = this.storageManager.restoreFromBackup(backup);
        this.assert(restoreResult === true, 'Restore should return true');

        const restoredData = this.storageManager.load();
        this.assert(restoredData !== null, 'Data should be restored');
        this.assert(restoredData.tasks.length === 1, 'Should restore correct number of tasks');

        console.log('✅ Backup and restore tests passed\n');
    }

    /**
     * Test PersistentTaskManager functionality
     */
    testPersistentTaskManager() {
        console.log('Testing PersistentTaskManager...');
        
        // Clear any existing data
        this.persistentTaskManager.clearStorage();
        
        // Test auto-save functionality
        const task = this.persistentTaskManager.addTask('Persistent Test', 'Test description', 'high');
        this.assert(task.id === 1, 'Task should have correct ID');
        
        // Create new instance to test persistence
        const newManager = new PersistentTaskManager('test-persistent');
        const loadedTasks = newManager.getTasks();
        this.assert(loadedTasks.length === 1, 'Should load persisted task');
        this.assert(loadedTasks[0].title === 'Persistent Test', 'Should load correct task data');

        // Test storage info
        const storageInfo = this.persistentTaskManager.getStorageInfo();
        this.assert(storageInfo.available === true, 'Storage info should be available');
        this.assert(storageInfo.dataSize > 0, 'Should have data in storage');

        console.log('✅ PersistentTaskManager tests passed\n');
    }

    /**
     * Test error handling
     */
    testErrorHandling() {
        console.log('Testing error handling...');
        
        // Test with invalid data
        const invalidData = { invalid: 'data' };
        const saveResult = this.storageManager.save(invalidData);
        this.assert(saveResult === true, 'Should handle invalid data gracefully');

        // Test restore with invalid backup
        const invalidBackup = { invalid: 'backup' };
        const restoreResult = this.storageManager.restoreFromBackup(invalidBackup);
        this.assert(restoreResult === false, 'Should reject invalid backup');

        // Test import with invalid file
        const invalidFile = new Blob(['invalid json'], { type: 'application/json' });
        invalidFile.name = 'invalid.json';
        
        this.storageManager.importData(invalidFile).then(result => {
            this.assert(result === null, 'Should handle invalid import gracefully');
        });

        console.log('✅ Error handling tests passed\n');
    }

    /**
     * Clean up test data
     */
    cleanup() {
        this.storageManager.clear();
        this.persistentTaskManager.clearStorage();
        console.log('🧹 Test cleanup completed');
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
        
        console.log('\n📊 Storage Test Results Summary:');
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
        
        if (failed === 0) {
            console.log('\n🎉 All storage tests passed! Data persistence is working correctly.');
        } else {
            console.log('\n⚠️  Some storage tests failed. Please check the implementation.');
        }
    }
}

// Auto-run tests when this file is loaded
if (typeof window !== 'undefined') {
    // Browser environment
    window.StorageTests = StorageTests;
    console.log('Storage tests loaded. Run "new StorageTests().runAllTests()" to execute tests.');
} else {
    // Node.js environment
    module.exports = StorageTests;
}
