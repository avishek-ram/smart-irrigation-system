using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace smart_irrigation_web_app.Migrations
{
    public partial class Initializelast_moisture_level : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "last_moisture_level",
                table: "tbl_garden",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "last_moisture_level",
                table: "tbl_garden",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
