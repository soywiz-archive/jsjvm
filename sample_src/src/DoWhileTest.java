public class DoWhileTest {
    static int test1(int count) {
        int sum = 0;
        do {
            sum += count;
        } while (count-- > 0);
        return sum;
    }

    static int test2(int count) {
        int sum = 0;
        do {
            sum += count;
        } while (--count > 0);
        return sum;
    }
}
