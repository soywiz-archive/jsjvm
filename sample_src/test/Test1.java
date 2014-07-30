import org.junit.Assert;

public class Test1 {
    @org.junit.Test
    public void testName() throws Exception {
        Assert.assertEquals(55, DoWhileTest.test1(10));
        Assert.assertEquals(55, DoWhileTest.test2(10));
    }

    @org.junit.Test
    public void test2() throws Exception {
        Assert.assertEquals(5, Samples.countEven(1, 11));
    }

    @org.junit.Test
    public void test3() throws Exception {
        Assert.assertEquals(2, Samples.countEvenArray(new int[] { 1, 2, 3, 4, 5 }));
    }
}
