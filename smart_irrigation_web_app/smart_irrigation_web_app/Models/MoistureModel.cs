namespace smart_irrigation_web_app.Models
{
    public class MoistureModel
    {
        public int moisture { get; set; }
        public int gardenid { get; set; }
        public int preferredMoistureLevel { get; set; }
    }

    public class PumpModel 
    {
        public int gardenid { get; set; }
        public bool? forcetogglepump { get; set; }
        public int preferredMoistureLevel { get; set; }
    }
}
