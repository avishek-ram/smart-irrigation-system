using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace smart_irrigation_web_app.Migrations
{
    public partial class SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "tbl_garden",
                columns: new[] { "id", "ManualTrigger", "force_toggle_pump", "last_moisture_level", "prefered_moisture_level", "pump_trigger_status" },
                values: new object[] { 1, null, null, 0, null, null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "tbl_garden",
                keyColumn: "id",
                keyValue: 1);
        }
    }
}
