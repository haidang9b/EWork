﻿// <auto-generated />
using System;
using EW.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EW.Infrastructure.Migrations
{
    [DbContext(typeof(EWContext))]
    [Migration("20221024094522_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("EW.Domain.Entities.Role", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            CreatedDate = new DateTimeOffset(new DateTime(2022, 10, 24, 16, 45, 22, 218, DateTimeKind.Unspecified).AddTicks(6278), new TimeSpan(0, 7, 0, 0, 0)),
                            Description = "Faculty",
                            Name = "Faculty",
                            UpdatedDate = new DateTimeOffset(new DateTime(2022, 10, 24, 16, 45, 22, 218, DateTimeKind.Unspecified).AddTicks(6296), new TimeSpan(0, 7, 0, 0, 0))
                        },
                        new
                        {
                            Id = 2L,
                            CreatedDate = new DateTimeOffset(new DateTime(2022, 10, 24, 16, 45, 22, 218, DateTimeKind.Unspecified).AddTicks(6299), new TimeSpan(0, 7, 0, 0, 0)),
                            Description = "Business",
                            Name = "Business",
                            UpdatedDate = new DateTimeOffset(new DateTime(2022, 10, 24, 16, 45, 22, 218, DateTimeKind.Unspecified).AddTicks(6299), new TimeSpan(0, 7, 0, 0, 0))
                        },
                        new
                        {
                            Id = 3L,
                            CreatedDate = new DateTimeOffset(new DateTime(2022, 10, 24, 16, 45, 22, 218, DateTimeKind.Unspecified).AddTicks(6301), new TimeSpan(0, 7, 0, 0, 0)),
                            Description = "Student",
                            Name = "Student",
                            UpdatedDate = new DateTimeOffset(new DateTime(2022, 10, 24, 16, 45, 22, 218, DateTimeKind.Unspecified).AddTicks(6301), new TimeSpan(0, 7, 0, 0, 0))
                        });
                });

            modelBuilder.Entity("EW.Domain.Entities.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Dept")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<long>("RoleId")
                        .HasColumnType("bigint");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("EW.Domain.Entities.User", b =>
                {
                    b.HasOne("EW.Domain.Entities.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });
#pragma warning restore 612, 618
        }
    }
}
