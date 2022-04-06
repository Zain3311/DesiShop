using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;

namespace DesiShop.ManagementClasses
{
    public class database
    {
        public static string connectionString = "Server=161.97.127.67,1433;Database=DesiShop;Integrated Security=False;User Id=MalikZainAli;Password=ZainAli123456789!@#$%^&*(;";
        public static int ExecNonQuery(string Command)
        {
            SqlConnection con = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            cmd.CommandText = Command;
            cmd.CommandType = CommandType.Text;
            try
            {
                con.Open();
                if (cmd.ExecuteNonQuery() > 0)
                {
                    con.Close();
                    return 1;
                }
                else
                {
                    con.Close();
                    return 0;
                }

            }
            catch (Exception ex)
            {
                con.Close();
                throw ex;
            }

        }
        public static DataTable GetDataTable(string Query)
        {
            SqlConnection con = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = con;
            cmd.CommandText = Query;
            cmd.CommandType = CommandType.Text;

            SqlDataAdapter da = new SqlDataAdapter();

            DataTable tab = new DataTable();

            da.SelectCommand = cmd;
            try
            {
                da.Fill(tab);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return tab;
        }
    }
}
