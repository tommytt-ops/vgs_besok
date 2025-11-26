import unittest
import main2 as func

class TestOppgave1(unittest.TestCase):
    def test_basic(self):
        result = func.oppgave1([1, 2, 3, 4, 5])
        self.assertEqual(result, [5, 4, 3, 2, 1], '')
    
    def test_empty(self):
        result = func.oppgave1([])
        self.assertEqual(result, [], '')


class TestOppgave2(unittest.TestCase):
    def test_basic(self):
        result = func.oppgave2([6, 2, 1])
        self.assertEqual(result, [1, 2, 6], '')
    
    def test_empty(self):
        result = func.oppgave2([])
        self.assertEqual(result, [], '')


class TestOppgave3(unittest.TestCase):
    def test_basic1(self):
        result = func.oppgave3(1000)
        self.assertEqual(result, "1,000", '')
    
    def test_basic2(self):
        result = func.oppgave3(1234567)
        self.assertEqual(result, "1,234,567", '')


class TestOppgave4(unittest.TestCase):
    def test_basic_false1(self):
        result = func.oppgave4("hello")
        self.assertEqual(result, False, '')
    
    def test_basic_true1(self):
        result = func.oppgave4("ada")
        self.assertEqual(result, True, '')


class TestOppgave5(unittest.TestCase):
    def test_count_vowels(self):
        result = func.oppgave5(9)
        self.assertEqual(result, 34, '')
    
    def test_count_vowels_no_vowels(self):
        result = func.oppgave5(0)
        self.assertEqual(result, 0, '')

if __name__ == '__main__':
    
    import sys
    GREEN = "\033[92m"
    RED = "\033[91m"
    loader = unittest.TestLoader()
    suite = loader.loadTestsFromModule(sys.modules[__name__])
    
    # Custom simple runner without tracebacks
    passed = 0
    failed = 0
    errors = 0
    
    for test in suite:
        for case in test:
            test_name = str(case).split()[0]
            try:
                result = unittest.TestResult()
                case.run(result)
                if result.wasSuccessful():
                    print(f"{GREEN}✓ {test_name}")
                    passed += 1
                elif result.failures:
                    print(f"{RED}✗ {test_name}")
                    failed += 1
                elif result.errors:
                    print(f"{RED}✗ {test_name}")
                    errors += 1
            except Exception:
                print(f"{RED}✗ {test_name}")
                errors += 1
    
    print(f"\nRan {passed + failed + errors} tests: {passed} passed, {failed} failed, {errors} errors")
    sys.exit(0 if (failed + errors) == 0 else 1)