import unittest
import main as func

class TestOppgave1(unittest.TestCase):
    def test_addition(self):
        result = func.oppgave1(1, "+", 1)
        self.assertEqual(result, 2, '')
    
    def test_subtraction(self):
        result = func.oppgave1(5, "-", 3)
        self.assertEqual(result, 2, '')
    
    def test_multiplication(self):
        result = func.oppgave1(4, "*", 3)
        self.assertEqual(result, 12, '')
    
    def test_division(self):
        result = func.oppgave1(10, "/", 2)
        self.assertEqual(result, 5, '')


class TestOppgave2(unittest.TestCase):
    def test_even_number(self):
        result = func.oppgave2(4)
        self.assertEqual(result, True, '')
    
    def test_odd_number(self):
        result = func.oppgave2(3)
        self.assertEqual(result, False, '')


class TestOppgave3(unittest.TestCase):
    def test_reverse_string(self):
        result = func.oppgave3("hello")
        self.assertEqual(result, "olleh", '')
    
    def test_reverse_empty_string(self):
        result = func.oppgave3("")
        self.assertEqual(result, "", '')


class TestOppgave4(unittest.TestCase):
    def test_largest_number(self):
        result = func.oppgave4([3, 7, 2, 9, 1])
        self.assertEqual(result, 9, '')
    
    def test_single_number(self):
        result = func.oppgave4([5])
        self.assertEqual(result, 5, '')


class TestOppgave5(unittest.TestCase):
    def test_count_vowels(self):
        result = func.oppgave5("hello")
        self.assertEqual(result, 2, '')
    
    def test_count_vowels_no_vowels(self):
        result = func.oppgave5("xyz")
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

