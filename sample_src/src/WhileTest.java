public class WhileTest {
    static int test1(int count) {
        int sum = 0;
        while (count-- > 0) sum += count;
        return sum;
    }
}
