using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace smart_irrigation_web_app.Migrations
{
    public partial class Updatingmodelprop : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "ManualTrigger",
                table: "tbl_garden",
                type: "bit",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ManualTrigger",
                table: "tbl_garden",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);
        }
    }
}
