using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EW.Infrastructure.Migrations
{
    public partial class addtableapplication : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Applications",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CoverLetter = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserCVId = table.Column<long>(type: "bigint", nullable: false),
                    RecruitmentPostId = table.Column<long>(type: "bigint", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    UpdatedDate = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Applications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Applications_RecruitmentPosts_RecruitmentPostId",
                        column: x => x.RecruitmentPostId,
                        principalTable: "RecruitmentPosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Applications_UserCvs_UserCVId",
                        column: x => x.UserCVId,
                        principalTable: "UserCvs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 28, 20, 1, 34, 393, DateTimeKind.Unspecified).AddTicks(1675), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 28, 20, 1, 34, 393, DateTimeKind.Unspecified).AddTicks(1701), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 28, 20, 1, 34, 393, DateTimeKind.Unspecified).AddTicks(1704), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 28, 20, 1, 34, 393, DateTimeKind.Unspecified).AddTicks(1705), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 28, 20, 1, 34, 393, DateTimeKind.Unspecified).AddTicks(1708), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 28, 20, 1, 34, 393, DateTimeKind.Unspecified).AddTicks(1711), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.CreateIndex(
                name: "IX_Applications_RecruitmentPostId",
                table: "Applications",
                column: "RecruitmentPostId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_UserCVId",
                table: "Applications",
                column: "UserCVId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Applications");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 20, 16, 22, 52, 456, DateTimeKind.Unspecified).AddTicks(4343), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 20, 16, 22, 52, 456, DateTimeKind.Unspecified).AddTicks(4370), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 20, 16, 22, 52, 456, DateTimeKind.Unspecified).AddTicks(4374), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 20, 16, 22, 52, 456, DateTimeKind.Unspecified).AddTicks(4375), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 20, 16, 22, 52, 456, DateTimeKind.Unspecified).AddTicks(4377), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 20, 16, 22, 52, 456, DateTimeKind.Unspecified).AddTicks(4378), new TimeSpan(0, 7, 0, 0, 0)) });
        }
    }
}