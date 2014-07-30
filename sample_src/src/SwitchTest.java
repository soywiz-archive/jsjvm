public class SwitchTest {
    static int test1(int value) {
        switch (value) {
            case 1: return -1;
            case 4: return -4;
        }
        return value;
    }
}
