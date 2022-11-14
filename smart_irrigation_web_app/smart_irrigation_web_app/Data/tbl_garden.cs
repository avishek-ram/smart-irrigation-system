using System;
using System.Collections.Generic;

namespace smart_irrigation_web_app.Data
{
    public partial class tbl_garden
    {
        public int id { get; set; }
        public int? last_moisture_level { get; set; }
        public bool? pump_trigger_status { get; set; }
        public int? prefered_moisture_level { get; set; }
        public bool? force_toggle_pump { get; set; }
    }
}
