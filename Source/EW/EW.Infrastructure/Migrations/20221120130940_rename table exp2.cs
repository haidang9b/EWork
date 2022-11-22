using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EW.Infrastructure.Migrations
{
    public partial class renametableexp2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserExperences_Users_UserId",
                table: "UserExperences");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserExperences",
                table: "UserExperences");

            migrationBuilder.RenameTable(
                name: "UserExperences",
                newName: "UserExperiences");

            migrationBuilder.RenameIndex(
                name: "IX_UserExperences_UserId",
                table: "UserExperiences",
                newName: "IX_UserExperiences_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserExperiences",
                table: "UserExperiences",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 20, 20, 9, 40, 218, DateTimeKind.Unspecified).AddTicks(1728), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 20, 20, 9, 40, 218, DateTimeKind.Unspecified).AddTicks(1752), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 20, 20, 9, 40, 218, DateTimeKind.Unspecified).AddTicks(1753), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 20, 20, 9, 40, 218, DateTimeKind.Unspecified).AddTicks(1754), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 20, 20, 9, 40, 218, DateTimeKind.Unspecified).AddTicks(1755), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 20, 20, 9, 40, 218, DateTimeKind.Unspecified).AddTicks(1756), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.AddForeignKey(
                name: "FK_UserExperiences_Users_UserId",
                table: "UserExperiences",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserExperiences_Users_UserId",
                table: "UserExperiences");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserExperiences",
                table: "UserExperiences");

            migrationBuilder.RenameTable(
                name: "UserExperiences",
                newName: "UserExperences");

            migrationBuilder.RenameIndex(
                name: "IX_UserExperiences_UserId",
                table: "UserExperences",
                newName: "IX_UserExperences_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserExperences",
                table: "UserExperences",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 20, 20, 8, 39, 23, DateTimeKind.Unspecified).AddTicks(8232), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 20, 20, 8, 39, 23, DateTimeKind.Unspecified).AddTicks(8253), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 20, 20, 8, 39, 23, DateTimeKind.Unspecified).AddTicks(8255), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 20, 20, 8, 39, 23, DateTimeKind.Unspecified).AddTicks(8256), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 20, 20, 8, 39, 23, DateTimeKind.Unspecified).AddTicks(8257), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 20, 20, 8, 39, 23, DateTimeKind.Unspecified).AddTicks(8257), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.AddForeignKey(
                name: "FK_UserExperences_Users_UserId",
                table: "UserExperences",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
