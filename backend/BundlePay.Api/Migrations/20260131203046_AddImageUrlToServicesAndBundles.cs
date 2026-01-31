using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BundlePay.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddImageUrlToServicesAndBundles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Services",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Bundles",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Bundles");
        }
    }
}
