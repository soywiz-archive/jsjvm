public class Samples {
    static int countEven(int start, int end) {
        int count = 0;
        for (int n = start; n < end; n++) {
            if ((n % 2) == 0) count++;
        }
        return count;
    }

    static int countEvenArray(int[] items) {
        int count = 0;
        for (int item : items) {
            if ((item % 2) == 0) count++;
        }
        return count;
    }
}
