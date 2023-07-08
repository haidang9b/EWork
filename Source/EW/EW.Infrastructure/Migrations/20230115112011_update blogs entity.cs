using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EW.Infrastructure.Migrations
{
    public partial class updateblogsentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blogs_Users_UserCreateId",
                table: "Blogs");

            migrationBuilder.DropIndex(
                name: "IX_Blogs_UserCreateId",
                table: "Blogs");

            migrationBuilder.DropColumn(
                name: "UserCreateId",
                table: "Blogs");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Blogs",
                newName: "UserId");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 1, 15, 18, 20, 10, 966, DateTimeKind.Unspecified).AddTicks(9824), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 1, 15, 18, 20, 10, 966, DateTimeKind.Unspecified).AddTicks(9855), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 1, 15, 18, 20, 10, 966, DateTimeKind.Unspecified).AddTicks(9857), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 1, 15, 18, 20, 10, 966, DateTimeKind.Unspecified).AddTicks(9858), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 1, 15, 18, 20, 10, 966, DateTimeKind.Unspecified).AddTicks(9860), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 1, 15, 18, 20, 10, 966, DateTimeKind.Unspecified).AddTicks(9861), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.CreateIndex(
                name: "IX_Blogs_UserId",
                table: "Blogs",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Blogs_Users_UserId",
                table: "Blogs",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blogs_Users_UserId",
                table: "Blogs");

            migrationBuilder.DropIndex(
                name: "IX_Blogs_UserId",
                table: "Blogs");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Blogs",
                newName: "CreatedBy");

            migrationBuilder.AddColumn<long>(
                name: "UserCreateId",
                table: "Blogs",
                type: "bigint",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 1, 15, 15, 5, 31, 52, DateTimeKind.Unspecified).AddTicks(566), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 1, 15, 15, 5, 31, 52, DateTimeKind.Unspecified).AddTicks(587), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 1, 15, 15, 5, 31, 52, DateTimeKind.Unspecified).AddTicks(589), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 1, 15, 15, 5, 31, 52, DateTimeKind.Unspecified).AddTicks(589), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 1, 15, 15, 5, 31, 52, DateTimeKind.Unspecified).AddTicks(591), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 1, 15, 15, 5, 31, 52, DateTimeKind.Unspecified).AddTicks(591), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.CreateIndex(
                name: "IX_Blogs_UserCreateId",
                table: "Blogs",
                column: "UserCreateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Blogs_Users_UserCreateId",
                table: "Blogs",
                column: "UserCreateId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
