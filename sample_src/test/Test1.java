import org.junit.Assert;

public class Test1 {
    @org.junit.Test
    public void testName() throws Exception {
        Assert.assertEquals(55, DoWhileTest.test1(10));
        Assert.assertEquals(55, DoWhileTest.test2(10));
    }
}
