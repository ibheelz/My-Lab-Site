export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: "Hardware" | "Software" | "Network" | "Guides" | "Windows Lab";
  color?: string;
  readTime: number;
  date: string;
  thumbnail?: string;
  tags?: string[];
  cardTags?: string[];
  sections?: BlogSection[];
}

export interface BlogSection {
  type: "h2" | "h3" | "p" | "code" | "ul" | "note" | "img" | "label" | "qa" | "tasklist" | "group" | "navpath" | "aside";
  content: string | string[];
  alt?: string;
  caption?: string;
  answer?: string;
  links?: Array<{ label: string; href: string }>;
  title?: string;
  children?: BlogSection[];
  boldLead?: boolean;
}

export const posts: BlogPost[] = [

  // ── Lab 1 ──────────────────────────────────────────────────────────────────
  {
    slug: "zcdc01-windows-domain-from-scratch",
    title: "Setting up a Windows Active Directory Domain Services: Part 1",
    description: "Built a Windows Server 2025 Active Directory domain from scratch. VM setup, DNS, DHCP, OU structure, user accounts, and remote access. Managed the whole build from a MacBook over RDP.",
    category: "Windows Lab",
    color: "rgb(192, 132, 252)",
    readTime: 14,
    date: "2026-10-10",
    thumbnail: "/images/blog/active-directory-cover.png",
    tags: ["Active Directory", "Windows Server", "PowerShell", "Setup", "Troubleshoot"],
    cardTags: ["Setup", "Troubleshoot"],
    sections: [
      { type: "h2", content: "Overview" },
      { type: "p", content: "I built a Windows Active Directory domain from scratch on a Windows Server 2025 VM running in VirtualBox on my ROG Ally X, managed remotely from my MacBook over Remote Desktop." },
      { type: "p", content: "Zenith Creative is a fictional 15-person design studio in Lagos that just bought their first server and needed a domain live before staff started Monday. I was the IT technician." },
      { type: "p", content: "I provisioned the VM, installed Server 2025, promoted it to a domain controller, configured DNS and DHCP, designed a structured OU hierarchy, created user accounts with the right permissions, and locked down remote access." },
      { type: "p", content: "Everything in this post comes from that build." },

      // ── Group: Infrastructure Setup ────────────────────────────────────────
      {
        type: "group",
        content: "",
        title: "Infrastructure Setup",
        children: [

          { type: "h3", content: "Tasks 1 to 3: Create the VM and Install Windows Server 2025" },
          {
            type: "note",
            content:
              "Create a Windows Server 2025 virtual machine with 4 GB RAM, 2 CPUs, a 60 GB disk, EFI firmware, and a bridged network adapter. Install Windows Server 2025 Standard with Desktop Experience.",
          },
          {
            type: "p",
            content:
              "I created the VM in VirtualBox, named it ZCDC01, and configured it with 4 GB RAM, 2 CPUs, a 60 GB dynamically allocated disk, and EFI firmware enabled. I set the network adapter to bridged mode. I attached the Windows Server 2025 ISO, booted the VM, selected Windows Server 2025 Standard Evaluation with Desktop Experience, accepted the licence, and chose the custom installation path. The installer completed without issues.",
          },
          {
            type: "img",
            content: "/images/blog/zcdc01/00-vm-details.png",
            alt: "VirtualBox VM details for ZCDC01 showing Windows Server 2025 64-bit, 4 GB RAM, 2 CPUs, 60 GB disk, and bridged network adapter",
            caption: "00. VirtualBox VM details: ZCDC01 running Windows Server 2025, 4 GB RAM, 60 GB disk, bridged adapter.",
          },
          {
            type: "aside",
            content: "Bridged networking places the server on the same physical network segment as my MacBook, so it receives a real IP address on the office subnet and can be managed remotely from any machine on that network. A NAT adapter would isolate it behind VirtualBox and make remote management impossible without extra port-forwarding rules.",
          },

          { type: "h3", content: "Task 4: Name the Server ZCDC01" },
          { type: "note", content: "Set the computer name to ZCDC01." },
          {
            type: "p",
            content:
              "I opened Server Manager, clicked the computer name link under Local Server, and renamed the machine ZCDC01 in the System Properties dialog. The server restarted to apply the change. The name follows a simple convention: ZC for Zenith Creative, DC for domain controller, 01 for the first instance. That pattern keeps the name readable in DNS records, event logs, and support tickets.",
          },
          { type: "label", content: "PowerShell equivalent:" },
          {
            type: "code",
            content:
              "Rename-Computer -NewName ZCDC01 -Restart\n  # renames the computer and restarts to apply it\nhostname\n  # prints the current computer name to confirm",
          },
          { type: "navpath", content: "ZCDC01 > Server Manager > Local Server" },
          {
            type: "img",
            content: "/images/blog/zcdc01/01-server-identity.png",
            alt: "Server Manager Local Server properties showing computer name ZCDC01 joined to zenithcreative.com with Ethernet IP 192.168.1.200",
            caption:
              "01. Server Manager confirming ZCDC01 as the computer name and zenithcreative.com as the domain.",
          },
          {
            type: "aside",
            content: "A clear, consistent naming convention makes the server identifiable at a glance in any tool, from ADUC to network scanners. A generic name like WIN-A1B2C3 gives no useful information when reading logs.",
          },

          { type: "h3", content: "Task 5: Set the Lagos Time Zone" },
          { type: "note", content: "Set the time zone to Lagos (UTC+01:00)." },
          {
            type: "p",
            content:
              "I opened Date and Time settings and set the time zone to UTC+01:00 West Central Africa. I verified the displayed time matched my MacBook clock before continuing.",
          },
          { type: "label", content: "PowerShell equivalent:" },
          {
            type: "code",
            content:
              "Set-TimeZone -Id \"W. Central Africa Standard Time\"\n  # sets the time zone to UTC+01:00, Lagos\nGet-TimeZone\n  # shows the current time zone to confirm",
          },
          { type: "navpath", content: "ZCDC01 > Control Panel > Date and Time" },
          {
            type: "img",
            content: "/images/blog/zcdc01/02-time-zone.png",
            alt: "Date and Time dialog on ZCDC01 showing UTC+01:00 West Central Africa time zone",
            caption: "02. Time zone set to UTC+01:00 West Central Africa.",
          },
          {
            type: "aside",
            content: "Kerberos, the authentication protocol Active Directory relies on, rejects logins when the clock on a client differs from the domain controller by more than five minutes. Setting the correct time zone before promotion prevents that failure from affecting anyone on day one.",
          },

          { type: "h3", content: "Task 6: Assign a Static IP Address" },
          { type: "note", content: "Assign a static IP address to the server NIC." },
          {
            type: "p",
            content:
              "I opened the IPv4 properties for the Ethernet adapter and set the IP address to 192.168.1.200 with a 255.255.255.0 subnet mask and 192.168.1.1 as the default gateway. For the preferred DNS I entered 127.0.0.1, pointing to the loopback address.",
          },
          { type: "label", content: "PowerShell equivalent:" },
          {
            type: "code",
            content:
              "New-NetIPAddress -InterfaceAlias \"Ethernet\" -IPAddress 192.168.1.200 -PrefixLength 24 -DefaultGateway 192.168.1.1\n  # sets a fixed IP, a 255.255.255.0 subnet mask, and the router as gateway\nSet-DnsClientServerAddress -InterfaceAlias \"Ethernet\" -ServerAddresses 192.168.1.1\n  # temporary DNS before promotion; promotion later points the NIC at itself\nipconfig /all\n  # shows the full network configuration to verify it",
          },
          { type: "navpath", content: "ZCDC01 > Network Connections > Ethernet > IPv4 Properties" },
          {
            type: "img",
            content: "/images/blog/zcdc01/03-ip-configuration.png",
            alt: "IPv4 Properties dialog showing static IP 192.168.1.200, subnet mask 255.255.255.0, default gateway 192.168.1.1, preferred DNS 127.0.0.1",
            caption:
              "03. Static IP 192.168.1.200 set on the Ethernet adapter. Preferred DNS is loopback, ready for the AD promotion.",
          },
          {
            type: "aside",
            content: "After the Active Directory promotion, the DNS service on this machine takes over and reconfigures the NIC to use itself as the resolver. Setting loopback at this stage avoids a chicken-and-egg problem during promotion. Every machine on the network will use this server as its DNS resolver and Kerberos authentication endpoint. If the server's IP changed, clients could no longer find it and logins, domain joins, and name lookups would all fail. A static address makes its location fixed and predictable.",
          },

          { type: "h3", content: "Task 7: Create the Forest zenithcreative.com" },
          {
            type: "p",
            content:
              "I installed the Active Directory Domain Services role through Server Manager, then clicked the yellow flag notification and selected Promote this server to a domain controller. I chose Add a new forest, entered zenithcreative.com as the root domain name, and set the NetBIOS name to ZENITH. I left the DNS option checked, set a strong DSRM recovery password, ran through the prerequisites check, and clicked Install. The server restarted automatically. After the restart I logged in as ZENITH\\Administrator and confirmed the domain was live.",
          },
          { type: "label", content: "PowerShell equivalent:" },
          {
            type: "code",
            content:
              "Install-WindowsFeature AD-Domain-Services -IncludeManagementTools\n  # installs the Active Directory role and its admin tools onto the server\nInstall-ADDSForest -DomainName \"zenithcreative.com\" -DomainNetbiosName \"ZENITH\" -InstallDns\n  # promotes the server: creates the forest, domain, AD database and DNS zone\nGet-ADDomain\n  # prints domain details to confirm promotion succeeded",
          },
          {
            type: "aside",
            content: "Installing the role and promoting the server are two distinct steps. Installing copies the AD DS binaries onto the machine: it adds the capability but changes nothing else. Promotion runs the actual configuration: it creates the AD database and SYSVOL folders, builds the DNS zone for zenithcreative.com, sets up Kerberos, and turns the server from a standalone Windows machine into a domain controller. A server with the role installed but not promoted cannot do any of that.",
          },

          { type: "h3", content: "Task 8: Resolve Internal and Internet Names" },
          {
            type: "note",
            content:
              "Confirm the DNS server resolves both internal company names and external internet names.",
          },
          {
            type: "p",
            content:
              "After the restart I opened PowerShell and tested both DNS paths. I pinged zenithcreative.com to confirm the domain controller answered for its own domain, and pinged google.com to confirm the forwarder was passing unknown names out through the router. Both resolved cleanly.",
          },
          { type: "label", content: "Commands I ran:" },
          {
            type: "code",
            content:
              "ping zenithcreative.com\n  # confirms the domain controller answers for its own domain\nping google.com\n  # confirms internet names resolve through the forwarder",
          },
          { type: "label", content: "PowerShell equivalent:" },
          {
            type: "code",
            content:
              "Get-DnsServerForwarder\n  # lists the IP addresses the DNS server forwards unknown queries to\nAdd-DnsServerForwarder -IPAddress 192.168.1.1\n  # adds the router as a forwarder if one is not already configured",
          },
          { type: "navpath", content: "ZCDC01 > Windows PowerShell" },
          {
            type: "img",
            content: "/images/blog/zcdc01/04-name-lookups.png",
            alt: "PowerShell on ZCDC01 showing ping to zenithcreative.com resolving to 192.168.1.200 and ping to google.com resolving to an external IP address",
            caption:
              "04. Internal name resolves to 192.168.1.200. External names forward through the router to the internet.",
          },
          {
            type: "aside",
            content: "The domain controller holds the authoritative DNS zone for zenithcreative.com and answers those queries itself. For any name it does not hold a record for, it forwards the query to 192.168.1.1. Without that forwarder every computer on the network would use this server as its only DNS resolver, meaning staff could authenticate and reach company resources but could not load any website or reach any external service. When it answers zenithcreative.com the response is authoritative: it holds the record directly. When it answered google.com the response was non-authoritative: it forwarded the query upstream to get the answer.",
          },

          { type: "h3", content: "Tasks 9 and 10: Enable Remote Desktop and Confirm Connectivity" },
          {
            type: "note",
            content:
              "Enable Remote Desktop on the server and confirm it can be reached and pinged from a remote workstation.",
          },
          {
            type: "p",
            content:
              "I enabled Remote Desktop early in the build so I could switch to managing the server from my Mac as quickly as possible. When I first tested network connectivity, the ping attempt failed but RDP on port 3389 was already working. I enabled the built-in ICMPv4 Echo Request inbound rule and ping came back clean. I then ran all remaining tasks from the Mac through the RDP session.",
          },
          { type: "label", content: "Command I ran:" },
          {
            type: "code",
            content:
              "ping 192.168.1.200\n  # confirms the server replies to ICMP after the firewall rule was enabled",
          },
          { type: "navpath", content: "MacBook Terminal > ping 192.168.1.200 (before firewall rule)" },
          {
            type: "img",
            content: "/images/blog/zcdc01/05a-ping-fail.png",
            alt: "MacBook terminal showing ping to 192.168.1.200 timing out with 100% packet loss before the ICMPv4 firewall rule was enabled",
            caption: "05a. Ping failing before the rule. 100% packet loss. The server is up; ICMP is just blocked by default.",
          },
          { type: "label", content: "PowerShell equivalent:" },
          {
            type: "code",
            content:
              "Enable-NetFirewallRule -Name FPS-ICMP4-ERQ-In\n  # switches on the built-in rule allowing incoming ping, ICMPv4 Echo Request\nSet-ItemProperty -Path 'HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server' -Name \"fDenyTSConnections\" -Value 0\n  # turns Remote Desktop on via the registry\nEnable-NetFirewallRule -DisplayGroup \"Remote Desktop\"\n  # opens the Windows firewall for RDP connections",
          },
          { type: "navpath", content: "MacBook Terminal > ping 192.168.1.200 (after firewall rule)" },
          {
            type: "img",
            content: "/images/blog/zcdc01/05-ping.png",
            alt: "MacBook terminal showing successful ping to 192.168.1.200 with replies after enabling the ICMPv4 Echo Request inbound firewall rule",
            caption: "05b. Ping succeeds after enabling the ICMPv4 Echo Request inbound firewall rule.",
          },
          { type: "navpath", content: "MacBook > Microsoft Remote Desktop > ZCDC01" },
          {
            type: "img",
            content: "/images/blog/zcdc01/06-rdp.png",
            alt: "Microsoft Remote Desktop on macOS with ZCDC01 Server Manager open inside an RDP session connected to 192.168.1.200",
            caption:
              "06. Server Manager open inside an RDP session from the MacBook. All remaining build work was done from here.",
          },
          {
            type: "aside",
            content: "RDP connecting while ping fails is a useful diagnostic combination. It confirms the server is up and the network path is open. Ping failing alone just means the Windows firewall is blocking ICMP, which is the default on Windows Server. It is not a server problem or a network problem.",
          },

        ],
      },

      // ── Group: Active Directory ────────────────────────────────────────────
      {
        type: "group",
        content: "",
        title: "Active Directory",
        children: [

          { type: "h3", content: "Task 11: Build the OU Structure" },
          {
            type: "note",
            content:
              "Create an Organisational Unit structure for IT Admins and departmental staff.",
          },
          {
            type: "p",
            content:
              "I opened Active Directory Users and Computers and created the following structure under the domain root.",
          },
          {
            type: "code",
            content:
              "zenithcreative.com\n └── Zenith\n      ├── Staff\n      │    ├── Design\n      │    └── Finance\n      └── IT Admins",
          },
          { type: "label", content: "PowerShell equivalent:" },
          {
            type: "code",
            content:
              "New-ADOrganizationalUnit -Name \"Zenith\" -Path \"DC=zenithcreative,DC=com\"\nNew-ADOrganizationalUnit -Name \"Staff\" -Path \"OU=Zenith,DC=zenithcreative,DC=com\"\nNew-ADOrganizationalUnit -Name \"Design\" -Path \"OU=Staff,OU=Zenith,DC=zenithcreative,DC=com\"\nNew-ADOrganizationalUnit -Name \"Finance\" -Path \"OU=Staff,OU=Zenith,DC=zenithcreative,DC=com\"\nNew-ADOrganizationalUnit -Name \"IT Admins\" -Path \"OU=Zenith,DC=zenithcreative,DC=com\"\n  # each line creates one OU at the given path in the directory",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com" },
          {
            type: "img",
            content: "/images/blog/zcdc01/07-ou-tree.png",
            alt: "Active Directory Users and Computers showing the OU tree: IT Admins OU at domain level beside the Staff OU, which contains Design and Finance child OUs",
            caption: "07. OU tree: IT Admins sits at the same level as Staff, not inside it.",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Staff > Design" },
          {
            type: "img",
            content: "/images/blog/zcdc01/08-design-ou.png",
            alt: "Design OU in ADUC containing user Chide Eze and security group Design Staff",
            caption: "08. Design OU containing one user account and the Design Staff security group.",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Staff > Finance" },
          {
            type: "img",
            content: "/images/blog/zcdc01/09-finance-ou.png",
            alt: "Finance OU in ADUC containing users Funmi Adebayo and Kemi Johnson alongside the Finance Staff security group",
            caption: "09. Finance OU containing two user accounts and the Finance Staff security group.",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > IT Admins" },
          {
            type: "img",
            content: "/images/blog/zcdc01/10-it-admin-ou.png",
            alt: "IT Admins OU in ADUC containing a single user named Abiola",
            caption: "10. IT Admins OU: the personal admin account sits here, separate from all staff OUs.",
          },
          {
            type: "aside",
            content: "Users live in OUs rather than the default Users container because only OUs can receive Group Policy Objects and delegated control. IT Admins sits beside Staff rather than inside it because any Group Policy linked to the Staff OU must never apply to admin accounts. Structural separation makes that guarantee permanent.",
          },

          { type: "h3", content: "Tasks 12 to 15: User Accounts and Personal Admin Account" },
          {
            type: "note",
            content:
              "Create user accounts for Design and Finance staff, and a personal admin account adm.abiola with domain admin rights.",
          },
          {
            type: "p",
            content:
              "I used the New User wizard in ADUC to create accounts for Chide Eze (ceze) in the Design OU and Funmi Adebayo (fadebayo) in the Finance OU. I set a temporary password and ticked the box requiring a change at first login for both. I then created my personal admin account, adm.abiola, in the IT Admins OU and added it to the Domain Admins group.",
          },
          { type: "label", content: "PowerShell equivalent:" },
          {
            type: "code",
            content:
              "New-ADUser -Name \"Chidi Eze\" -GivenName Chidi -Surname Eze -SamAccountName ceze -UserPrincipalName ceze@zenithcreative.com -Path \"OU=Design,OU=Staff,OU=Zenith,DC=zenithcreative,DC=com\" -AccountPassword (Read-Host -AsSecureString \"Temporary password\") -ChangePasswordAtLogon $true -Enabled $true\n  # creates the user, prompts for a temporary password, forces a change at first login\nAdd-ADGroupMember -Identity \"Domain Admins\" -Members adm.abiola\n  # grants the personal admin account domain admin rights",
          },
          {
            type: "p",
            content: "Funmi Adebayo (fadebayo) was created in the Finance OU using the same process.",
          },

          { type: "h3", content: "Tasks 16 and 17: Security Groups" },
          {
            type: "note",
            content:
              "Create security groups for Design Staff and Finance Staff, and add the appropriate user accounts.",
          },
          {
            type: "p",
            content:
              "I created a Design Staff security group inside the Design OU and added ceze. I created a Finance Staff security group inside the Finance OU and added fadebayo.",
          },
          { type: "label", content: "PowerShell equivalent:" },
          {
            type: "code",
            content:
              "New-ADGroup -Name \"Design Staff\" -GroupScope Global -GroupCategory Security -Path \"OU=Design,OU=Staff,OU=Zenith,DC=zenithcreative,DC=com\"\n  # creates a security group in the Design OU\nAdd-ADGroupMember -Identity \"Design Staff\" -Members ceze\n  # adds a user to the group\nGet-ADGroupMember -Identity \"Design Staff\"\n  # lists the group's current members\nGet-ADPrincipalGroupMembership -Identity adm.abiola | Select-Object Name\n  # lists every group an account belongs to",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Staff > Design > Design Staff > Members" },
          {
            type: "img",
            content: "/images/blog/zcdc01/11-design-staff-members.png",
            alt: "Design Staff security group Properties Members tab showing Chide Eze as a member from zenithcreative.com/Staff/Design",
            caption: "11. Design Staff group: Chide Eze is the sole member.",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Staff > Finance > Finance Staff > Members" },
          {
            type: "img",
            content: "/images/blog/zcdc01/12-finance-staff-members.png",
            alt: "Finance Staff security group Properties Members tab showing Funmi Adebayo and Kemi Johnson from zenithcreative.com/Staff/Finance",
            caption: "12. Finance Staff group: both Finance users are members.",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > IT Admins > adm.abiola > Member Of" },
          {
            type: "img",
            content: "/images/blog/zcdc01/13-admin-group-memberships.png",
            alt: "adm.abiola user Properties Member Of tab showing Domain Admins and Domain Users group memberships",
            caption: "13. adm.abiola is a member of Domain Admins. A named personal account, not the shared built-in Administrator.",
          },
          {
            type: "aside",
            content: "Permissions are assigned to the groups, not to individual user accounts. Adding or removing someone from a group is the only action needed to grant or revoke access. Onboarding and offboarding both become a single operation.",
          },

        ],
      },

      // ── Group: Support Tickets ─────────────────────────────────────────────
      {
        type: "group",
        content: "",
        title: "Support Tickets",
        children: [

          { type: "h3", content: "Ticket 1042" },
          { type: "note", content: "\"Hi IT, I'm Chidi. I forgot my password and I can't log in.\"" },
          { type: "label", content: "Diagnosis:" },
          { type: "p", content: "The account password needed resetting." },
          { type: "label", content: "Resolution:" },
          {
            type: "p",
            content:
              "I located Chide Eze in the Design OU in ADUC, right-clicked the account, and selected Reset Password. I set a temporary password and ticked the box requiring a change at next logon.",
          },
          { type: "label", content: "PowerShell equivalent:" },
          {
            type: "code",
            content:
              "Set-ADAccountPassword -Identity ceze -Reset -NewPassword (Read-Host -AsSecureString \"New temporary password\")\n  # sets a new password without needing the old one\nSet-ADUser -Identity ceze -ChangePasswordAtLogon $true\n  # forces the user to choose their own password at next login\nUnlock-ADAccount -Identity ceze\n  # clears a lockout from too many failed attempts, if applicable",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Staff > Design > ceze > Reset Password" },
          {
            type: "img",
            content: "/images/blog/zcdc01/14-ticket-1042.png",
            alt: "Reset Password dialog for a user in the Design OU with empty new password fields and User must change password at next logon checked",
            caption: "14. Ticket 1042: password reset with forced change at next logon.",
          },
          {
            type: "aside",
            content: "Admins can reset passwords but can never read them. Windows stores only a hash of each password, not the value itself. The forced change at next logon means the admin never knows the user's actual working password.",
          },

          { type: "h3", content: "Ticket 1043" },
          {
            type: "note",
            content:
              "\"Funmi is going on 3 months maternity leave from today. Please make sure nobody can use her account while she's away, but don't delete anything.\"",
          },
          { type: "label", content: "Diagnosis:" },
          {
            type: "p",
            content: "The account needed to block all login attempts without removing it or any of its access.",
          },
          { type: "label", content: "Resolution:" },
          {
            type: "p",
            content:
              "I located Funmi Adebayo in the Finance OU, right-clicked her account, and selected Disable Account.",
          },
          { type: "label", content: "PowerShell equivalent:" },
          {
            type: "code",
            content:
              "Disable-ADAccount -Identity fadebayo\n  # blocks all logins while keeping the account and its memberships intact\nGet-ADUser -Identity fadebayo | Select-Object Name, Enabled\n  # confirms Enabled is False\nEnable-ADAccount -Identity fadebayo\n  # for when she returns",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Staff > Finance > fadebayo > (right-click menu)" },
          {
            type: "img",
            content: "/images/blog/zcdc01/15-ticket-1043.png",
            alt: "ADUC right-click context menu on Funmi Adebayo with Enable Account highlighted, confirming the account is currently disabled",
            caption:
              "15. Ticket 1043: Funmi's account disabled. Enable Account in the context menu confirms it is currently off.",
          },
          {
            type: "aside",
            content: "Deleting the account destroys its Security Identifier. A recreated account gets a new SID, which means every group membership and every file permission that referenced the original SID is permanently gone. Disabling preserves everything. One click re-enables the account and she continues exactly where she left off.",
          },

          { type: "h3", content: "Ticket 1044" },
          {
            type: "note",
            content:
              "\"Our new hire Kemi Johnson starts in Finance tomorrow. Logon name kjohnson. Same access as Funmi.\"",
          },
          { type: "label", content: "Diagnosis:" },
          {
            type: "p",
            content: "A new user account was needed in the Finance OU with identical access to an existing Finance user.",
          },
          { type: "label", content: "Resolution:" },
          {
            type: "p",
            content:
              "I checked Funmi's group memberships to know what access to copy, created a new user account for Kemi Johnson (kjohnson) in the Finance OU, and added her to the Finance Staff security group.",
          },
          { type: "label", content: "PowerShell equivalent:" },
          {
            type: "code",
            content:
              "Get-ADPrincipalGroupMembership -Identity fadebayo | Select-Object Name\n  # checks Funmi's groups to know which ones to copy\nNew-ADUser -Name \"Kemi Johnson\" -GivenName Kemi -Surname Johnson -SamAccountName kjohnson -UserPrincipalName kjohnson@zenithcreative.com -Path \"OU=Finance,OU=Staff,OU=Zenith,DC=zenithcreative,DC=com\" -AccountPassword (Read-Host -AsSecureString \"Temporary password\") -ChangePasswordAtLogon $true -Enabled $true\n  # creates the account in the Finance OU\nAdd-ADGroupMember -Identity \"Finance Staff\" -Members kjohnson\n  # grants the same access as Funmi through the group",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Staff > Finance > kjohnson > Member Of" },
          {
            type: "img",
            content: "/images/blog/zcdc01/16-ticket-1044.png",
            alt: "Kemi Johnson Properties Member Of tab showing Finance Staff and Domain Users group memberships",
            caption:
              "16. Ticket 1044: Kemi Johnson added to Finance Staff. Group membership grants her identical access to Funmi's in one step.",
          },
          {
            type: "aside",
            content: "Access is on the group, not the individual. Matching Funmi's groups gives Kemi the correct permissions in a single addition. There are no individual permission entries to audit or miss.",
          },

        ],
      },

      // ── Group: Final Verification ──────────────────────────────────────────
      {
        type: "group",
        content: "",
        title: "Final Verification",
        children: [

          {
            type: "p",
            content:
              "All final work, including the three ticket resolutions, was completed from the adm.abiola account. I ran whoami in PowerShell before closing the session to provide a clean record of the active identity.",
          },
          { type: "label", content: "Command I ran:" },
          {
            type: "code",
            content: "whoami\n  # shows the currently logged-in account and its domain",
          },
          { type: "navpath", content: "ZCDC01 > Windows PowerShell" },
          {
            type: "img",
            content: "/images/blog/zcdc01/17-logged-in-as-admin.png",
            alt: "Windows PowerShell terminal showing whoami returning zenith\\adm.abiola",
            caption: "17. All admin work done as zenith\\adm.abiola, confirmed with whoami.",
          },
          {
            type: "aside",
            content: "Using adm.abiola rather than the built-in Administrator account matters for two reasons. Every action in the domain event log is attributed to a specific person, not a shared account anyone with the password could be. The built-in Administrator is also a known target: it exists in every domain by default, its name is predictable, and attackers probe it first.",
          },

        ],
      },

    ],
  },

  // ── Lab 2 ──────────────────────────────────────────────────────────────────
  {
    slug: "zcdc02-gpo-file-shares-and-automation",
    title: "Active Directory: Group Policy, File Shares and Automation: Part 2",
    description: "I joined a Windows 11 workstation to the domain, automated bulk user creation with PowerShell, locked down workstations with GPOs, configured file shares with NTFS permissions, and set up automatic drive mapping.",
    category: "Windows Lab",
    color: "rgb(192, 132, 252)",
    readTime: 24,
    date: "2026-11-04",
    thumbnail: "/images/blog/active-directory-2-cover.png",
    tags: ["Active Directory", "Windows Server", "PowerShell", "Group Policy", "Setup", "Troubleshoot"],
    cardTags: ["Setup", "Troubleshoot"],
    sections: [

      // ── Group: Domain Operations ───────────────────────────────────────────
      {
        type: "group",
        content: "",
        title: "Domain Operations",
        children: [

          { type: "h3", content: "Task 1: Join ZCPC01 to the Domain" },
          { type: "note", content: "Join the Windows 11 workstation ZCPC01 to the zenithcreative.com domain." },
          {
            type: "p",
            content:
              "I opened System Properties on the Windows 11 VM, clicked Change next to the computer name, selected Domain, and entered zenithcreative.com. I authenticated with the adm.abiola domain admin account. Windows prompted for a restart and after the reboot the machine was visible in the Computers container in ADUC. I then moved it to the Zenith > Devices > Workstations OU so GPOs scoped to that OU would apply to it. The name ZCPC01 follows the same convention as the server: ZC for Zenith Creative, PC for workstation, 01 for the first unit.",
          },
          { type: "label", content: "PowerShell equivalent:" },
          {
            type: "code",
            content:
              "Add-Computer -DomainName zenithcreative.com -Credential (Get-Credential) -Restart\n  # joins the machine to the domain and restarts immediately\nMove-ADObject -Identity \"CN=ZCPC01,CN=Computers,DC=zenithcreative,DC=com\" -TargetPath \"OU=Workstations,OU=Devices,OU=Zenith,DC=zenithcreative,DC=com\"\n  # moves the computer object from the default Computers container to the correct OU",
          },
          { type: "navpath", content: "ZCPC01 > System Properties > Computer Name > Change" },
          {
            type: "img",
            content: "/images/blog/zcdc02/01a-domain-join.png",
            alt: "Computer Name/Domain Changes dialog showing ZCPC01 joining zenithcreative.com with the Domain radio button selected",
            caption: "01a. ZCPC01 joining zenithcreative.com. Domain radio button selected, domain name entered.",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Devices > Workstations" },
          {
            type: "img",
            content: "/images/blog/zcdc02/01b-zcpc01-workstations-ou.png",
            alt: "Active Directory Users and Computers showing ZCPC01 computer object in the Workstations OU under Zenith",
            caption: "01b. ZCPC01 appears in the Workstations OU in ADUC confirming the domain join succeeded.",
          },
          {
            type: "aside",
            content: "Moving the computer to the Workstations OU immediately matters. Any GPO linked to Workstations will not apply until the computer object sits in that OU. Leaving it in the default Computers container means those policies never reach it.",
          },

          { type: "h3", content: "Task 2: Create New Hire Accounts via PowerShell" },
          { type: "note", content: "12 new staff join Design and Finance on Monday. Create their accounts in bulk using a script. Output a staff report on completion." },
          {
            type: "p",
            content:
              "I wrote a PowerShell script called NewHires.ps1 and saved it to C:\\Scripts. The script reads a CSV of new staff, creates user accounts in the correct OUs, adds each user to their department security group, sets a temporary password with a forced change at first logon, and prints a formatted staff report at the end built from live AD data.",
          },
          { type: "label", content: "Script structure:" },
          {
            type: "code",
            content:
              "powershell -ExecutionPolicy Bypass -File .\\NewHires.ps1\n  # runs the script without permanently changing the execution policy\n\n# Script creates users like this:\nNew-ADUser @params -ErrorAction Stop\nAdd-ADGroupMember -Identity $group -Members $name\nWrite-Host \"CREATED $name > OU: $dept | Group: $group\"\n\n# Then runs a staff report:\nGet-ADUser -Filter * -SearchBase $OUPaths[$dept] -Properties Department,Title,Office,OfficePhone,Manager,MemberOf |\n  Select-Object Name,SamAccountName,Department,Title,Office,OfficePhone,Manager |\n  Sort-Object Department,Name | Format-Table -AutoSize",
          },
          { type: "note", content: "Security groups (Design Staff and Finance Staff) were created manually before running the script. The script created the user accounts and added each one to the appropriate group." },
          { type: "navpath", content: "ZCDC01 > Notepad > File > Save As" },
          {
            type: "img",
            content: "/images/blog/zcdc02/02a-save-newhires-script.png",
            alt: "Notepad Save As dialog saving NewHires.ps1 to C:\\Scripts, with the Scripts folder selected in the Save in navigation pane",
            caption: "02a. Script saved to C:\\Scripts\\NewHires.ps1 before running.",
          },
          { type: "navpath", content: "ZCDC01 > Windows PowerShell > NewHires.ps1" },
          {
            type: "img",
            content: "/images/blog/zcdc02/02b-newhires-script-output.png",
            alt: "PowerShell terminal showing NewHires.ps1 output with CREATED lines for each user and a formatted staff report table at the end",
            caption: "02b. NewHires.ps1 output. Each user confirmed created and assigned to their OU and security group.",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Staff > Finance" },
          {
            type: "img",
            content: "/images/blog/zcdc02/03a-finance-ou.png",
            alt: "Active Directory Users and Computers showing the Finance OU containing seven user accounts and the Finance Staff security group",
            caption: "03a. Finance OU: seven user accounts created by the script and added to Finance Staff security group.",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Staff > Finance > Finance Staff > Members" },
          {
            type: "img",
            content: "/images/blog/zcdc02/03b-finance-staff-members.png",
            alt: "Finance Staff group Properties Members tab showing seven Finance OU user accounts as members after the bulk creation script ran",
            caption: "03b. Finance Staff group: seven members added by the script.",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Staff > Design" },
          {
            type: "img",
            content: "/images/blog/zcdc02/04a-design-ou.png",
            alt: "Active Directory Users and Computers showing the Design OU containing six user accounts and the Design Staff security group",
            caption: "04a. Design OU: six user accounts created by the script and added to Design Staff security group.",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Staff > Design > Design Staff > Members" },
          {
            type: "img",
            content: "/images/blog/zcdc02/04b-design-staff-members.png",
            alt: "Design Staff group Properties Members tab showing six Design OU user accounts as members after the bulk creation script ran",
            caption: "04b. Design Staff group: six members added by the script.",
          },
          { type: "h3", content: "Task 3: Set Account Expiry for a Contractor" },
          { type: "note", content: "Tunde Bakare is a contractor. Set their account to expire automatically on December 2, 2026." },
          {
            type: "p",
            content:
              "I opened Tunde Bakare's account properties in ADUC, went to the Account tab, and set the account expiry to December 2, 2026. On that date Windows automatically blocks all logins without any manual action from IT.",
          },
          { type: "label", content: "PowerShell equivalent:" },
          {
            type: "code",
            content:
              "Set-ADAccountExpiration -Identity tunde.bakare -DateTime \"2026-12-02\"\n  # sets the account to expire at the start of that date\nGet-ADUser -Identity tunde.bakare -Properties AccountExpirationDate | Select-Object Name,AccountExpirationDate\n  # confirms the expiry was set",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Staff > Finance > tunde.bakare > Account" },
          {
            type: "img",
            content: "/images/blog/zcdc02/05-tunde-account-expiry.png",
            alt: "Tunde Bakare account properties Account tab showing account expires End of Wednesday December 2 2026",
            caption: "05. Tunde Bakare's account set to expire automatically on December 2, 2026.",
          },
          {
            type: "aside",
            content: "Account expiry is a safety net. If the offboarding request never arrives when the contractor finishes, the account still closes on schedule. Setting it at account creation means no future action is required.",
          },

          { type: "h3", content: "Task 4: Offboard a Resigned Staff Member" },
          { type: "note", content: "Emeka Obi has resigned with immediate effect. Disable the account, reset the password, record the reason, and move the object to the Leavers OU." },
          { type: "h3", content: "5 Crucial Offboarding Steps" },
          {
            type: "ul",
            boldLead: true,
            content: [
              "Disable the account immediately: Prevents the user from logging in while the account still exists for audit purposes.",
              "Reset the password to a random string: Ensures the former employee cannot regain access even if the disable is reversed.",
              "Remove from all security groups: Revokes access to file shares, printers, and any resource gated by group membership.",
              "Update the account description: Records the leave date and reason directly on the AD object for future reference.",
              "Move to the Leavers OU: Separates the object from active staff, keeps it out of GPO scope, and makes it easy to locate or delete after the retention period.",
            ],
          },
          {
            type: "p",
            content:
              "I ran Offboard-User.ps1 from C:\\Scripts, passing Emeka Obi's SAM account name and the reason Resigned. The script disabled the account and set it to expire immediately, reset the password to a random 12-character string not stored anywhere, removed him from Finance Staff, wrote the leave date and reason to the description field, and moved the object from the Finance OU to the Leavers OU. The whole process completed in under two seconds and was logged to C:\\Scripts\\Logs\\Leavers.log.",
          },
          { type: "label", content: "Command I ran:" },
          {
            type: "code",
            content: "powershell -ExecutionPolicy Bypass -File .\\Offboard-User.ps1 -SamAccountName emeka.obi -Reason \"Resigned\"",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Leavers" },
          {
            type: "img",
            content: "/images/blog/zcdc02/06a-leavers-ou-emeka.png",
            alt: "Active Directory Users and Computers showing the Leavers OU containing Emeka Obi with description LEFT 2026-11-02 Resigned",
            caption: "06a. Leavers OU: Emeka Obi moved here by the script. Description field stamped with leave date and reason.",
          },
          { type: "navpath", content: "ZCDC01 > Windows PowerShell > Offboard-User.ps1" },
          {
            type: "img",
            content: "/images/blog/zcdc02/06b-offboard-output.png",
            alt: "PowerShell terminal showing Offboard-User.ps1 steps for emeka.obi: account disabled, password reset, removed from Finance Staff, description updated, moved to Leavers OU",
            caption: "06b. Offboard-User.ps1 processing emeka.obi. Each step confirmed. Final state: account in Leavers OU.",
          },

          { type: "h3", content: "Task 5: Delegate Control on the Staff OU" },
          { type: "note", content: "Delegate the ability to reset passwords and unlock accounts on the Staff OU to the Helpdesk team." },
          {
            type: "p",
            content:
              "I right-clicked the Staff OU in ADUC and selected Delegate Control. I selected the Helpdesk group and chose the common task to reset user passwords and force a password change at next logon. This gives Helpdesk the minimum permission needed to handle password reset tickets without granting them domain admin rights.",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Staff > (right-click) > Delegate Control" },
          {
            type: "img",
            content: "/images/blog/zcdc02/07-delegation-wizard.png",
            alt: "Delegation of Control Wizard on the Staff OU showing the common tasks list with Reset user passwords and force password change at next logon checked",
            caption: "07. Delegation of Control on the Staff OU. Helpdesk gets password reset rights only.",
          },
          {
            type: "aside",
            content: "Giving a team domain admin rights to handle password resets is unnecessary access that expands the blast radius if that account is compromised. Delegated control scopes exactly what is needed to exactly the OU where it is needed.",
          },

          { type: "h3", content: "Task 6: Create the All Staff Security Group" },
          { type: "note", content: "Create a universal All Staff security group and nest Design Staff and Finance Staff inside it." },
          {
            type: "p",
            content:
              "I created All Staff in the Staff OU and added Design Staff and Finance Staff as members.",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Staff > All Staff > Members" },
          {
            type: "img",
            content: "/images/blog/zcdc02/08-all-staff-members.png",
            alt: "All Staff security group Properties Members tab showing Design Staff and Finance Staff as nested member groups",
            caption: "08. All Staff group: Design Staff and Finance Staff nested inside it.",
          },
          {
            type: "aside",
            content: "Any permission or policy applied to All Staff automatically covers every member of both departments. When a new department is added, nesting its security group into All Staff is the only change needed.",
          },

        ],
      },

      // ── Group: Password Policies ───────────────────────────────────────────
      {
        type: "group",
        content: "",
        title: "Password Policies",
        children: [

          { type: "h3", content: "Tasks 7 and 8: GPO — Password Policy" },
          { type: "note", content: "Create a domain-wide password policy GPO: minimum 12 characters, complexity required, maximum age 90 days, lockout after 5 failed attempts for 15 minutes." },
          {
            type: "p",
            content:
              "I created ZC Password Policy and linked it to the domain root so it applies to every user in zenithcreative.com. In the GPME I configured both Password Policy and Account Lockout Policy. Minimum password length 12 characters, complexity required, maximum age 90 days, lockout threshold 5 invalid attempts, lockout duration 15 minutes.",
          },
          { type: "label", content: "PowerShell equivalent:" },
          {
            type: "code",
            content:
              "Set-ADDefaultDomainPasswordPolicy -Identity zenithcreative.com -MinPasswordLength 12 -PasswordHistoryCount 24 -MaxPasswordAge (New-TimeSpan -Days 90) -ComplexityEnabled $true -LockoutThreshold 5 -LockoutDuration (New-TimeSpan -Minutes 15) -LockoutObservationWindow (New-TimeSpan -Minutes 15)\n  # sets the default domain password and lockout policy in one command\nGet-ADDefaultDomainPasswordPolicy\n  # confirms all values are correct",
          },
          { type: "navpath", content: "GPM > zenithcreative.com > Linked Group Policy Objects" },
          {
            type: "img",
            content: "/images/blog/zcdc02/09a-password-policy-linked.png",
            alt: "Group Policy Management showing ZC Password Policy GPO linked to the zenithcreative.com domain with Link Enabled Yes",
            caption: "09a. ZC Password Policy linked to the domain root at link order 1.",
          },
          { type: "navpath", content: "GPME > ZC Password Policy > Computer Configuration > Policies > Windows Settings > Security Settings > Account Policies > Password Policy" },
          {
            type: "img",
            content: "/images/blog/zcdc02/09b-password-policy-settings.png",
            alt: "Group Policy Management Editor showing Password Policy with minimum password length 12 characters and password must meet complexity requirements Enabled",
            caption: "09b. Password Policy: 12-character minimum, complexity required.",
          },
          { type: "navpath", content: "GPME > ZC Password Policy > Computer Configuration > Policies > Windows Settings > Security Settings > Account Policies > Account Lockout Policy" },
          {
            type: "img",
            content: "/images/blog/zcdc02/09c-account-lockout.png",
            alt: "Group Policy Management Editor showing Account Lockout Policy with lockout duration 15 minutes and lockout threshold 5 invalid logon attempts",
            caption: "09c. Account Lockout Policy: 5 failed attempts triggers a 15-minute lockout.",
          },
          {
            type: "aside",
            content: "Creating a separate ZC Password Policy GPO rather than editing the Default Domain Policy is deliberate. If something breaks, reverting a custom GPO is clean. Rolling back changes to the Default Domain Policy can have unpredictable side effects on other domain-wide settings it controls.",
          },

          { type: "h3", content: "Task 9: Fine-Grained Password Policy" },
          { type: "note", content: "Create a stricter password settings object for privileged accounts: 16-character minimum, lockout after 5 attempts, 90-day maximum age. Apply it to Domain Admins and Helpdesk." },
          {
            type: "p",
            content:
              "I opened Active Directory Administrative Center and created PSO_Privileged with a precedence of 10. I set the minimum password length to 16 characters and applied the PSO directly to Domain Admins and Helpdesk.",
          },
          { type: "label", content: "PowerShell equivalent:" },
          {
            type: "code",
            content:
              "New-ADFineGrainedPasswordPolicy -Name PSO_Privileged -Precedence 10 -MinPasswordLength 16 -PasswordHistoryCount 24 -MaxPasswordAge (New-TimeSpan -Days 90) -ComplexityEnabled $true -LockoutThreshold 5 -LockoutDuration (New-TimeSpan -Minutes 15) -LockoutObservationWindow (New-TimeSpan -Minutes 15) -ProtectedFromAccidentalDeletion $true\nAdd-ADFineGrainedPasswordPolicySubject -Identity PSO_Privileged -Subjects \"Domain Admins\",\"Helpdesk\"\n  # creates the PSO and applies it to both groups in two commands",
          },
          { type: "navpath", content: "ADAC > zenithcreative.com (local) > System > Password Settings Container > Create PSO_Privileged" },
          {
            type: "img",
            content: "/images/blog/zcdc02/10a-pso-create.png",
            alt: "Active Directory Administrative Center showing PSO_Privileged creation dialog with 16-character minimum and a Select Users or Groups dialog with Domain Admins being added",
            caption: "10a. Creating PSO_Privileged in ADAC. Domain Admins being added to Directly Applies To.",
          },
          { type: "navpath", content: "ADAC > zenithcreative.com (local) > System > Password Settings Container" },
          {
            type: "img",
            content: "/images/blog/zcdc02/10b-pso-applied.png",
            alt: "Active Directory Administrative Center showing PSO_Privileged with Domain Admins and Helpdesk in the Directly Applies To section",
            caption: "10b. PSO_Privileged: 16-character minimum applied to Domain Admins and Helpdesk.",
          },
          {
            type: "aside",
            content: "Lower precedence numbers win when multiple PSOs apply to the same account. A precedence of 10 ensures this policy overrides the domain-wide one for privileged accounts.",
          },

        ],
      },

      // ── Group: Workstation Restrictions ───────────────────────────────────
      {
        type: "group",
        content: "",
        title: "Staff PC Restrictions",
        children: [

          { type: "h3", content: "Tasks 10 and 11: GPO — Screen Lock" },
          { type: "note", content: "Create a GPO that enables the screen saver and locks the screen after a period of inactivity. Apply it to the Staff OU." },
          {
            type: "p",
            content:
              "I created ZC Staff Screen Lock and linked it to the Staff OU. I enabled the screen saver, set the timeout, and enabled password-protection on the screen saver.",
          },
          {
            type: "aside",
            content: "Because the policy is under User Configuration, it follows the user. It applies to any machine a staff member logs into, not just machines in the Workstations OU.",
          },
          { type: "navpath", content: "GPM > zenithcreative.com > Staff > Linked Group Policy Objects" },
          {
            type: "img",
            content: "/images/blog/zcdc02/11a-screen-lock-linked.png",
            alt: "Group Policy Management showing ZC Staff Screen Lock GPO linked to the Staff OU",
            caption: "11a. ZC Staff Screen Lock linked to the Staff OU.",
          },
          { type: "navpath", content: "GPME > ZC Staff Screen Lock > User Configuration > Administrative Templates > Control Panel > Personalization" },
          {
            type: "img",
            content: "/images/blog/zcdc02/11b-screen-saver-settings.png",
            alt: "Group Policy Management Editor showing Personalization settings with Enable screen saver set to Enabled",
            caption: "11b. Screen saver enabled via Personalization policy under User Configuration.",
          },

          { type: "h3", content: "Tasks 12 and 13: GPO — Control Panel Restriction" },
          { type: "note", content: "Prevent staff from accessing Control Panel and PC Settings. Apply it to the Staff OU." },
          {
            type: "p",
            content:
              "I created ZC Staff Settings and Control Panel Disable and linked it to the Staff OU. I enabled Prohibit access to Control Panel and PC settings. With this active, both the Control Panel and the Settings app are blocked. Users cannot change network settings, add software, or modify system preferences.",
          },
          { type: "navpath", content: "GPM > zenithcreative.com > Staff > Linked Group Policy Objects" },
          {
            type: "img",
            content: "/images/blog/zcdc02/12a-control-panel-gpo-linked.png",
            alt: "Group Policy Management showing Staff OU with ZC Staff Screen Lock and ZC Staff Settings and Control Panel Disable GPOs linked",
            caption: "12a. Staff OU: screen lock and control panel restriction GPOs both linked.",
          },
          { type: "navpath", content: "GPME > ZC Staff Settings > User Configuration > Administrative Templates > Control Panel" },
          {
            type: "img",
            content: "/images/blog/zcdc02/12b-prohibit-control-panel.png",
            alt: "Group Policy Management Editor showing Prohibit access to Control Panel and PC settings set to Enabled",
            caption: "12b. Prohibit access to Control Panel and PC settings: Enabled.",
          },

          { type: "h3", content: "Tasks 14 and 15: GPO — Block USB Storage" },
          { type: "note", content: "Prevent USB storage devices from being used on company workstations." },
          {
            type: "p",
            content:
              "I created ZC Block USB Storage Connection and linked it to the Workstations OU rather than the Staff OU. I enabled All Removable Storage Classes: Deny All Access. This single setting blocks all classes of removable storage without needing a rule per device type.",
          },
          {
            type: "aside",
            content: "The policy is under Computer Configuration so it follows the machine, not the user. Linking it to Workstations OU means it applies to every machine in that OU regardless of who is logged in.",
          },
          { type: "navpath", content: "GPM > zenithcreative.com > Workstations > Linked Group Policy Objects" },
          {
            type: "img",
            content: "/images/blog/zcdc02/13a-usb-gpo-linked.png",
            alt: "Group Policy Management showing Workstations OU with ZC Block USB Storage Connection GPO linked",
            caption: "13a. ZC Block USB Storage Connection linked to the Workstations OU.",
          },
          { type: "navpath", content: "GPME > ZC Block USB Storage > Computer Configuration > Administrative Templates > System > Removable Storage Access" },
          {
            type: "img",
            content: "/images/blog/zcdc02/13b-removable-storage-deny.png",
            alt: "Group Policy Management Editor showing All Removable Storage classes Deny all access set to Enabled",
            caption: "13b. All Removable Storage classes: Deny all access. Enabled.",
          },
          {
            type: "aside",
            content: "If a domain admin logs into a workstation, the USB block still applies because the machine is in the Workstations OU. User-scoped policies follow the user. Computer-scoped policies follow the machine. Getting the distinction right determines whether the policy does what you intend.",
          },

        ],
      },

      // ── Group: Branding & Wallpaper ────────────────────────────────────────
      {
        type: "group",
        content: "",
        title: "Branding & Wallpaper",
        children: [

          { type: "h3", content: "Tasks 16 and 17: GPO — Branding Assets" },
          { type: "note", content: "Use Group Policy to deploy the company wallpaper image file from the NETLOGON share to all workstations." },
          {
            type: "p",
            content:
              "I created ZC Branding Assets and linked it to the Workstations OU. I placed zenith_wallpaper.jpg in a branding subfolder inside NETLOGON so the path is \\\\zenithcreative.com\\NETLOGON\\Branding\\zenith_wallpaper.jpg. I added an action to copy the image to C:\\Windows\\Web\\Wallpaper\\Zenith\\zenith_wallpaper.jpg on each workstation.",
          },
          {
            type: "aside",
            content: "NETLOGON is reachable by every domain-joined machine without additional share configuration, which makes it the standard place for files that workstations need to pull at startup.",
          },
          { type: "navpath", content: "GPM > zenithcreative.com > Workstations > Linked Group Policy Objects" },
          {
            type: "img",
            content: "/images/blog/zcdc02/14a-branding-gpo-linked.png",
            alt: "Group Policy Management showing Workstations OU with ZC Block USB Storage Connection and ZC Branding Assets GPOs linked",
            caption: "14a. ZC Branding Assets linked to the Workstations OU.",
          },
          { type: "navpath", content: "GPME > ZC Branding Assets > Computer Configuration > Preferences > Windows Settings > Files" },
          {
            type: "img",
            content: "/images/blog/zcdc02/14b-branding-files-empty.png",
            alt: "Group Policy Management Editor Files section of ZC Branding Assets showing no items and a right-click context menu with New and File options visible",
            caption: "14b. Files section empty before setup. Right-click opens the menu to create a new file action.",
          },
          { type: "navpath", content: "File Explorer > Network > ZCDC01.zenithcreative.com" },
          {
            type: "img",
            content: "/images/blog/zcdc02/14c-netlogon-sysvol.png",
            alt: "File Explorer browsing ZCDC01.zenithcreative.com over the network showing NETLOGON and SYSVOL shared folders",
            caption: "14c. NETLOGON and SYSVOL shares on ZCDC01. The branding subfolder was created inside NETLOGON.",
          },
          { type: "navpath", content: "File Explorer > Network > ZCDC01.zenithcreative.com > NETLOGON > branding" },
          {
            type: "img",
            content: "/images/blog/zcdc02/14d-netlogon-branding.png",
            alt: "File Explorer showing the branding subfolder inside NETLOGON containing zenith_wallpaper.jpg at 224 KB",
            caption: "14d. zenith_wallpaper.jpg uploaded to NETLOGON\\branding. This is the source the file action copies from.",
          },
          { type: "navpath", content: "GPME > ZC Branding Assets > Files > zenith_wallpaper.jpg Properties > General" },
          {
            type: "img",
            content: "/images/blog/zcdc02/14e-branding-file-copy.png",
            alt: "zenith_wallpaper.jpg file action Properties showing source as NETLOGON Branding and destination as C Windows Web Wallpaper Zenith",
            caption: "14e. File action: source \\\\zenithcreative.com\\NETLOGON\\Branding, destination C:\\Windows\\Web\\Wallpaper\\Zenith.",
          },
          { type: "navpath", content: "GPME > ZC Branding Assets > Computer Configuration > Preferences > Windows Settings > Files" },
          {
            type: "img",
            content: "/images/blog/zcdc02/14f-branding-file-listed.png",
            alt: "Group Policy Management Editor showing ZC Branding Assets with zenith_wallpaper.jpg file action copying from NETLOGON Branding to C Windows Web Wallpaper Zenith",
            caption: "14f. File copy action now listed. Source and destination confirmed.",
          },

          { type: "h3", content: "Tasks 18 and 19: GPO — Desktop Wallpaper" },
          { type: "note", content: "Set the company wallpaper on all workstations using Group Policy. Users should not be able to change it." },
          {
            type: "p",
            content:
              "I created a separate GPO called ZC Wallpaper and linked it to the Staff OU. I enabled Desktop Wallpaper and set the path to C:\\Windows\\Web\\Wallpaper\\Zenith\\zenith_wallpaper.jpg, the local path the Branding Assets GPO copies the file to.",
          },
          {
            type: "aside",
            content: "Keeping this as a separate GPO from ZC Branding Assets makes the purpose of each GPO clear and allows the file deployment and the display policy to be managed independently.",
          },
          { type: "navpath", content: "GPM > zenithcreative.com > Staff > Linked Group Policy Objects" },
          {
            type: "img",
            content: "/images/blog/zcdc02/15a-wallpaper-staff-linked.png",
            alt: "Group Policy Management showing Staff OU with ZC Screen Lock, ZC Staff Settings, ZC Wallpaper, and ZC Design Printer linked",
            caption: "15a. ZC Wallpaper (item 3) linked to the Staff OU. User Configuration follows users, not computers.",
          },
          { type: "navpath", content: "GPME > ZC Wallpaper > User Configuration > Administrative Templates > Desktop > Desktop" },
          {
            type: "img",
            content: "/images/blog/zcdc02/15b-wallpaper-gpme-desktop.png",
            alt: "Group Policy Management Editor Desktop section of ZC Wallpaper GPO showing the Desktop Wallpaper setting listed as Enabled",
            caption: "15b. Desktop Wallpaper in the ZC Wallpaper GPO Desktop section. Enabled.",
          },
          { type: "navpath", content: "GPME > ZC Wallpaper > User Configuration > Administrative Templates > Desktop > Desktop > Desktop Wallpaper" },
          {
            type: "img",
            content: "/images/blog/zcdc02/15c-wallpaper-policy.png",
            alt: "Group Policy Management Editor Desktop Wallpaper setting showing Enabled with wallpaper path C Windows Web Wallpaper Zenith zenith_wallpaper.jpg",
            caption: "15c. Desktop Wallpaper policy enabled with local path after the Branding Assets file copy.",
          },
          { type: "navpath", content: "ZCPC01 > Windows Desktop (after gpupdate)" },
          {
            type: "img",
            content: "/images/blog/zcdc02/15d-wallpaper-applied.png",
            alt: "Windows 11 desktop on ZCPC01 showing the Zenith Creative branded wallpaper applied after Group Policy refresh",
            caption: "15d. Wallpaper applied on ZCPC01 after gpupdate. Policy working as expected.",
          },

        ],
      },

      // ── Group: Software & Printers ─────────────────────────────────────────
      {
        type: "group",
        content: "",
        title: "Software & Printers",
        children: [

          { type: "h3", content: "Tasks 20 to 22: GPO — Software Deployment" },
          { type: "note", content: "Deploy 7-Zip to all workstations silently via Group Policy software installation. Ensure Group Policy applies synchronously at startup so the software is present before users log in." },
          {
            type: "p",
            content:
              "Group Policy software installation requires the MSI to sit on a network share that every workstation can reach. I downloaded 7z2409-x64.msi and created a software subfolder inside NETLOGON on the domain controller. The resulting UNC path is \\\\zenithcreative.com\\NETLOGON\\software\\7z2409-x64.msi. NETLOGON is already accessible to every domain-joined machine with no extra share setup, which makes it the standard place for deployment files.",
          },
          { type: "note", content: "The MSI must be referenced by its UNC path, not a local path like C:\\. When Group Policy runs on a workstation at startup, the machine reaches out to the DC over the network to fetch the installer. A local path only exists on the DC itself and would fail on every other machine." },
          {
            type: "p",
            content:
              "I created a new GPO called ZC 7zip Software Installer and linked it to the Workstations OU. Inside GPME I navigated to Computer Configuration > Software Settings > Software Installation, right-clicked the pane, and selected New > Package. In the file browser I typed the full UNC path into the address bar, opened the software folder, selected 7z2409-x64.msi, and clicked Open. A dialog asks whether to deploy as Published or Assigned. I chose Assigned.",
          },
          { type: "note", content: "Assigned vs Published: Assigned installs the software automatically at computer startup with no user involvement. Published makes it available for users to install manually from Control Panel but does not push it automatically. For a tool the whole organisation needs, Assigned is the correct choice." },
          { type: "p", content: "I also enabled Always wait for the network at computer startup and logon. Without this, Group Policy runs asynchronously in the background and the login screen can appear before the software installation has finished. Enabling it forces a full synchronous Group Policy cycle to complete, including the software install, before the login screen appears." },
          { type: "navpath", content: "File Explorer > Network > ZCDC01.zenithcreative.com > NETLOGON > software" },
          {
            type: "img",
            content: "/images/blog/zcdc02/16a-netlogon-software-msi.png",
            alt: "File Explorer showing the software subfolder inside NETLOGON on ZCDC01 containing 7z2409-x64.msi at 1941 KB",
            caption: "16a. 7z2409-x64.msi placed in NETLOGON\\software. All workstations can reach this path at startup.",
          },
          { type: "navpath", content: "GPM > zenithcreative.com > Workstations > Linked Group Policy Objects" },
          {
            type: "img",
            content: "/images/blog/zcdc02/16b-7zip-gpo-linked.png",
            alt: "Group Policy Management showing Workstations OU with ZC Block USB, ZC Branding Assets, and ZC 7zip Software Installer GPOs linked",
            caption: "16b. ZC 7zip Software Installer linked to the Workstations OU.",
          },
          { type: "navpath", content: "GPME > ZC 7zip Software Installer > Computer Configuration > Software Settings > Software Installation" },
          {
            type: "img",
            content: "/images/blog/zcdc02/16c-7zip-software-install.png",
            alt: "Group Policy Management Editor Software installation showing 7-Zip 24.09 x64 edition Assigned with source from NETLOGON software",
            caption: "16c. 7-Zip 24.09 assigned via Software Installation from NETLOGON.",
          },
          { type: "navpath", content: "GPME > ZC 7zip Software Installer > Computer Configuration > Software Settings > Software Installation > 7-Zip Properties" },
          {
            type: "img",
            content: "/images/blog/zcdc02/16d-7zip-deployment-properties.png",
            alt: "7-Zip 24.09 x64 edition Properties dialog showing Deployment type set to Assigned",
            caption: "16d. 7-Zip deployment properties: type set to Assigned so it installs automatically at startup.",
          },
          { type: "navpath", content: "GPME > ZC 7zip Software Installer > Computer Configuration > Administrative Templates > System > Logon" },
          {
            type: "img",
            content: "/images/blog/zcdc02/16e-logon-wait-network.png",
            alt: "Group Policy Management Editor Logon settings list showing Always wait for the network at computer startup and logon highlighted as Enabled",
            caption: "16e. The policy confirmed Enabled in the Logon settings list.",
          },
          { type: "navpath", content: "ZCPC01 > Start Menu (after Group Policy refresh)" },
          {
            type: "img",
            content: "/images/blog/zcdc02/16f-7zip-verified.png",
            alt: "Windows 11 Start menu search for 7z showing 7-Zip File Manager as the best match",
            caption: "16f. 7-Zip visible in Start on ZCPC01 (user workstation) after Group Policy ran at startup. Software deployment confirmed.",
          },

          { type: "h3", content: "Tasks 23 to 25: GPO — Printer Deployment" },
          { type: "note", content: "Deploy the ZCDesignPrinter shared printer to Design Staff workstations only, using item-level targeting." },
          {
            type: "p",
            content:
              "I created ZC Design Printer and linked it to the Staff OU. I added a shared printer pointing to \\\\ZCDC01\\ZCDesignPrinter. On the Common tab I enabled Item-level targeting and added a Security Group condition: the user must be a member of Design Staff. The printer maps only for Design Staff members even though the GPO is linked to the broader Staff OU.",
          },
          { type: "navpath", content: "ZCDC01 > Settings > Printers & scanners > Add Printer > Find a printer by other options" },
          {
            type: "img",
            content: "/images/blog/zcdc02/17a-add-printer-method.png",
            alt: "Add Printer wizard showing Find a printer by other options with Add a local printer or network printer with manual settings selected",
            caption: "17a. Add Printer wizard: selected Add a local printer or network printer with manual settings.",
          },
          { type: "navpath", content: "ZCDC01 > Settings > Printers & scanners > Add Printer > Choose a printer port" },
          {
            type: "img",
            content: "/images/blog/zcdc02/17b-add-printer-port.png",
            alt: "Add Printer wizard Choose a printer port step showing Use an existing port LPT1 selected",
            caption: "17b. Printer port: Use an existing port, LPT1.",
          },
          { type: "navpath", content: "ZCDC01 > Settings > Printers & scanners > Add Printer > Install the printer driver" },
          {
            type: "img",
            content: "/images/blog/zcdc02/17c-add-printer-driver.png",
            alt: "Add Printer wizard Install the printer driver step showing Generic manufacturer and Generic Text Only driver selected",
            caption: "17c. Driver: Generic / Text Only. This is a virtual shared printer so no physical driver is needed.",
          },
          { type: "navpath", content: "ZCDC01 > Settings > Printers & scanners > Add Printer > Which version of the driver" },
          {
            type: "img",
            content: "/images/blog/zcdc02/17d-add-printer-driver-version.png",
            alt: "Add Printer wizard asking which driver version to use showing Use the driver that is currently installed recommended selected",
            caption: "17d. Driver version: use the currently installed driver.",
          },
          { type: "navpath", content: "ZCDC01 > Settings > Printers & scanners > Add Printer > Type a printer name" },
          {
            type: "img",
            content: "/images/blog/zcdc02/17e-add-printer-name.png",
            alt: "Add Printer wizard Type a printer name step with ZCDesignPrinter entered as the printer name",
            caption: "17e. Printer name set to ZCDesignPrinter.",
          },
          { type: "navpath", content: "ZCDC01 > Settings > Printers & scanners > Add Printer > Printer Sharing" },
          {
            type: "img",
            content: "/images/blog/zcdc02/17f-add-printer-sharing.png",
            alt: "Add Printer wizard Printer Sharing step showing Share this printer selected with share name ZCDesignPrinter",
            caption: "17f. Printer sharing enabled. Share name ZCDesignPrinter: this is what the GPO UNC path points to.",
          },
          { type: "navpath", content: "ZCDC01 > Settings > Printers & scanners > Add Printer > Finish" },
          {
            type: "img",
            content: "/images/blog/zcdc02/17g-add-printer-success.png",
            alt: "Add Printer wizard success screen showing You've successfully added ZCDesignPrinter",
            caption: "17g. ZCDesignPrinter created and shared on ZCDC01. The GPO can now reference \\\\ZCDC01\\ZCDesignPrinter.",
          },
          { type: "navpath", content: "GPM > zenithcreative.com > Staff > Linked Group Policy Objects" },
          {
            type: "img",
            content: "/images/blog/zcdc02/18a-design-printer-linked.png",
            alt: "Group Policy Management showing Staff OU with four linked GPOs including ZC Design Printer",
            caption: "18a. ZC Design Printer linked to the Staff OU. Item-level targeting scopes it to Design Staff.",
          },
          { type: "navpath", content: "GPME > ZC Design Printer > User Configuration > Preferences > Control Panel Settings > Printers" },
          {
            type: "img",
            content: "/images/blog/zcdc02/18b-printers-new-menu.png",
            alt: "Group Policy Management Editor Printers section showing an empty pane with right-click context menu open and New submenu showing Shared Printer, TCP/IP Printer, and Local Printer options",
            caption: "18b. Printers section empty. Right-click > New > Shared Printer to add the printer preference.",
          },
          { type: "navpath", content: "GPME > ZC Design Printer > User Configuration > Preferences > Control Panel Settings > Printers > ZCDesignPrinter Properties > General" },
          {
            type: "img",
            content: "/images/blog/zcdc02/18c-printer-general.png",
            alt: "ZCDesignPrinter Properties General tab showing Action Update and Share path set to \\\\ZCDC01\\ZCDesignPrinter",
            caption: "18c. Printer share path: \\\\ZCDC01\\ZCDesignPrinter. Action set to Update.",
          },
          { type: "navpath", content: "GPME > ZC Design Printer > User Configuration > Preferences > Control Panel Settings > Printers > ZCDesignPrinter Properties > Common" },
          {
            type: "img",
            content: "/images/blog/zcdc02/18d-printer-common-targeting.png",
            alt: "ZCDesignPrinter Properties Common tab showing Item-level targeting checkbox ticked with Targeting button available",
            caption: "18d. Common tab: Item-level targeting enabled. Only matching users will receive this printer.",
          },
          { type: "navpath", content: "GPME > ZC Design Printer > Targeting Editor > New Item" },
          {
            type: "img",
            content: "/images/blog/zcdc02/18e-targeting-new-item.png",
            alt: "Targeting Editor with New Item dropdown expanded showing a list of targeting types with Security Group highlighted",
            caption: "18e. Targeting Editor: New Item menu open with Security Group selected as the targeting type.",
          },
          { type: "navpath", content: "GPME > ZC Design Printer > Targeting Editor > Security Group > Select Group" },
          {
            type: "img",
            content: "/images/blog/zcdc02/18f-targeting-select.png",
            alt: "Select Group dialog with Design Staff typed in the object name field and zenithcreative.com as the location",
            caption: "18f. Selecting Design Staff as the security group target from zenithcreative.com.",
          },
          { type: "navpath", content: "GPME > ZC Design Printer > Targeting Editor" },
          {
            type: "img",
            content: "/images/blog/zcdc02/18g-targeting-confirmed.png",
            alt: "Targeting Editor showing the user is a member of the security group ZENITH\\Design Staff with the group SID confirmed",
            caption: "18g. Targeting confirmed: printer maps only when the user is a member of ZENITH\\Design Staff.",
          },
          { type: "navpath", content: "GPME > ZC Design Printer > User Configuration > Preferences > Control Panel Settings > Printers" },
          {
            type: "img",
            content: "/images/blog/zcdc02/18h-design-printer-setup.png",
            alt: "Group Policy Management Editor Printers section showing ZCDesignPrinter mapped to ZCDC01 ZCDesignPrinter with action Update",
            caption: "18h. ZCDesignPrinter preference item in the GPO.",
          },

        ],
      },

      // ── Group: File Shares & Access ────────────────────────────────────────
      {
        type: "group",
        content: "",
        title: "File Shares & Access",
        children: [

          { type: "h3", content: "Tasks 26 and 27: Access Groups and File Shares" },
          { type: "note", content: "Create domain local security groups for each share permission level, create SMB shares for Design, Finance, and Public, and set NTFS permissions using the groups." },
          {
            type: "p",
            content:
              "I created four domain local groups in the Zenith > Access Groups OU: DL DesignFiles Modify, DL FinanceFiles Modify, DL Public Read, and DL Public Edit. I nested Design Staff into DL DesignFiles Modify, Finance Staff into DL FinanceFiles Modify, and Domain Users into DL Public Read. I created the SMB shares from Server Manager under File and Storage Services. For each share I ran the New Share wizard with SMB Quick, then customised the NTFS permissions: I disabled inheritance, removed the default entries, and added only the relevant DL group with Modify access and Administrators with Full Control.",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Access Groups" },
          {
            type: "img",
            content: "/images/blog/zcdc02/19a-dl-groups.png",
            alt: "Active Directory Users and Computers showing the Access Groups OU with DL DesignFiles Modify, DL FinanceFiles Modify, DL Public Edit, and DL Public Read",
            caption: "19a. Access Groups OU: four domain local groups, one per share permission level.",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Access Groups > DL DesignFiles Modify > Members" },
          {
            type: "img",
            content: "/images/blog/zcdc02/19b-dl-designfiles-members.png",
            alt: "DL DesignFiles Modify group Properties Members tab showing Design Staff from zenithcreative.com/Zenith/Staff/Design as the sole member",
            caption: "19b. DL DesignFiles Modify: Design Staff nested in as the sole member.",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Access Groups > DL FinanceFiles Modify > Members" },
          {
            type: "img",
            content: "/images/blog/zcdc02/19c-dl-financefiles-members.png",
            alt: "DL FinanceFiles Modify group Properties Members tab showing Finance Staff from zenithcreative.com as the sole member",
            caption: "19c. DL FinanceFiles Modify: Finance Staff nested in as the sole member.",
          },
          { type: "navpath", content: "ADUC > zenithcreative.com > Zenith > Access Groups > DL Public Read > Members" },
          {
            type: "img",
            content: "/images/blog/zcdc02/19d-dl-public-read-members.png",
            alt: "DL Public Read group Properties Members tab showing Domain Users from zenithcreative.com as the sole member",
            caption: "19d. DL Public Read: Domain Users nested in, covering every domain account.",
          },
          { type: "navpath", content: "ZCDC01 > Server Manager > File and Storage Services > Shares" },
          {
            type: "img",
            content: "/images/blog/zcdc02/20a-server-manager-new-share.png",
            alt: "Server Manager File and Storage Services Shares view showing NETLOGON, print dollar, and SYSVOL with a New Share context menu open",
            caption: "20a. Server Manager Shares before setup. Right-click opens the New Share wizard.",
          },
          { type: "navpath", content: "New Share Wizard > Select Profile" },
          {
            type: "img",
            content: "/images/blog/zcdc02/20b-share-wizard-smb-quick.png",
            alt: "New Share Wizard Select the profile screen with SMB Share Quick selected from the file share profile list",
            caption: "20b. SMB Share - Quick selected. The fastest path for a standard SMB file share.",
          },
          { type: "navpath", content: "New Share Wizard > Share Location" },
          {
            type: "img",
            content: "/images/blog/zcdc02/20c-share-wizard-select-server.png",
            alt: "New Share Wizard Share Location screen with ZCDC01 selected as the server and C: volume chosen for the share location",
            caption: "20c. ZCDC01 selected as the server. Share folder will be created under C:\\Shares.",
          },
          { type: "navpath", content: "New Share Wizard > Share Name" },
          {
            type: "img",
            content: "/images/blog/zcdc02/20d-share-wizard-name.png",
            alt: "New Share Wizard Specify share name screen showing share name DesignFiles, local path C:\\Shares\\DesignFiles, and remote path \\\\ZCDC01\\DesignFiles",
            caption: "20d. Share name: DesignFiles. Local path C:\\Shares\\DesignFiles. Remote path \\\\ZCDC01\\DesignFiles.",
          },
          { type: "navpath", content: "New Share Wizard > Other Settings" },
          {
            type: "img",
            content: "/images/blog/zcdc02/20e-share-wizard-settings.png",
            alt: "New Share Wizard Configure share settings screen with Enable access-based enumeration and Allow caching of share checked",
            caption: "20e. Access-based enumeration enabled: users only see shares they have permission to access.",
          },
          { type: "navpath", content: "New Share Wizard > Permissions" },
          {
            type: "img",
            content: "/images/blog/zcdc02/20f-share-wizard-initial-permissions.png",
            alt: "New Share Wizard Specify permissions screen showing default folder permissions with BUILTIN\\Users and BUILTIN\\Administrators entries",
            caption: "20f. Default permissions before customisation. Inheritance will be blocked and these replaced with the DL group.",
          },
          { type: "navpath", content: "ZCDC01 > File Explorer > DesignFiles > Advanced Security Settings > Block Inheritance" },
          {
            type: "img",
            content: "/images/blog/zcdc02/20g-security-block-inheritance.png",
            alt: "Advanced Security Settings for DesignFiles with Block Inheritance dialog asking what to do with current inherited permissions",
            caption: "20g. Blocking inheritance on DesignFiles. Inherited permissions will be removed so only explicit entries remain.",
          },
          { type: "navpath", content: "ZCDC01 > File Explorer > DesignFiles > Advanced Security Settings > Add > Select a principal" },
          {
            type: "img",
            content: "/images/blog/zcdc02/20h-permission-entry-add-dl.png",
            alt: "Permission Entry for DesignFiles with Select User Computer Service Account or Group dialog showing DL DesignFiles Modify typed in the object name field",
            caption: "20h. Adding DL DesignFiles Modify as the principal for the new NTFS permission entry.",
          },
          { type: "navpath", content: "ZCDC01 > File Explorer > DesignFiles > Advanced Security Settings > DL DesignFiles Modify > Permissions" },
          {
            type: "img",
            content: "/images/blog/zcdc02/20i-permission-entry-permissions.png",
            alt: "Permission Entry for DesignFiles showing DL DesignFiles Modify as principal with Modify Read and Execute List Read and Write permissions checked",
            caption: "20i. DL DesignFiles Modify granted Modify access. Full Control unchecked: Design Staff can read and write but not change ownership.",
          },
          { type: "navpath", content: "New Share Wizard > Permissions (updated)" },
          {
            type: "img",
            content: "/images/blog/zcdc02/20j-share-wizard-permissions-updated.png",
            alt: "New Share Wizard Specify permissions screen showing ZENITH\\DL DesignFiles Modify with Modify access and BUILTIN\\Administrators with Full Control",
            caption: "20j. Wizard permissions panel updated: only DL DesignFiles Modify (Modify) and Administrators (Full Control) remain.",
          },
          { type: "navpath", content: "New Share Wizard > Confirmation" },
          {
            type: "img",
            content: "/images/blog/zcdc02/20k-share-wizard-confirm.png",
            alt: "New Share Wizard Confirm selections screen showing ZCDC01, local path C:\\Shares\\DesignFiles, share name DesignFiles, SMB protocol, access-based enumeration enabled",
            caption: "20k. Final confirmation: DesignFiles on ZCDC01, C:\\Shares\\DesignFiles, SMB, access-based enumeration on.",
          },
          { type: "navpath", content: "New Share Wizard > Results" },
          {
            type: "img",
            content: "/images/blog/zcdc02/20l-share-wizard-results.png",
            alt: "New Share Wizard View results screen showing Create SMB share and Set SMB permissions both completed successfully",
            caption: "20l. Share created successfully. Both tasks completed.",
          },
          { type: "navpath", content: "ZCDC01 > File Explorer > DesignFiles > Advanced Security Settings" },
          {
            type: "img",
            content: "/images/blog/zcdc02/20m-designfiles-permissions.png",
            alt: "Advanced Security Settings for DesignFiles showing Administrators Full Control and DL DesignFiles Modify Modify access, both non-inherited",
            caption: "20m. DesignFiles NTFS permissions after blocking inheritance. Only two entries remain.",
          },
          { type: "navpath", content: "ZCDC01 > Server Manager > File and Storage Services > Shares" },
          {
            type: "img",
            content: "/images/blog/zcdc02/20n-server-manager-designfiles-listed.png",
            alt: "Server Manager Shares view now showing four shares: NETLOGON, print dollar, SYSVOL, and DesignFiles at C:\\Shares\\DesignFiles",
            caption: "20n. Server Manager confirms DesignFiles is now listed alongside the built-in shares.",
          },
          { type: "note", content: "I repeated the exact same wizard steps above to create the FinanceFiles share: New Share > SMB Quick, same folder path pattern, block inheritance, remove defaults, add DL FinanceFiles Modify with Modify access and Administrators with Full Control. The process is identical: only the share name and DL group change." },
          { type: "navpath", content: "ZCDC01 > File Explorer > Public > Advanced Security Settings" },
          {
            type: "img",
            content: "/images/blog/zcdc02/20o-public-share-permissions.png",
            alt: "Advanced Security Settings for Public share showing Administrators Full Control and Domain Users Read and Execute, both non-inherited",
            caption: "20o. Public share NTFS permissions: Administrators Full Control, Domain Users Read and Execute. Inheritance blocked.",
          },
          { type: "navpath", content: "Server Manager > File and Storage Services > Shares" },
          {
            type: "img",
            content: "/images/blog/zcdc02/20p-all-shares-listed.png",
            alt: "Server Manager File and Storage Services Shares view showing six shares on ZCDC01: DesignFiles, FinanceFiles, Public, print dollar, SYSVOL, and NETLOGON",
            caption: "20p. Server Manager confirms all three custom shares alongside the built-in shares.",
          },
          { type: "navpath", content: "ZCPC01 > File Explorer > Network > ZCDC01" },
          {
            type: "img",
            content: "/images/blog/zcdc02/21a-shares-visible.png",
            alt: "File Explorer browsing ZCDC01 showing DesignFiles, FinanceFiles, netlogon, Public, sysvol and ZCDesignPrinter",
            caption: "21a. All shares visible from a client. NTFS permissions control what each user can access inside each share.",
          },
          { type: "navpath", content: "ZCPC01 > File Explorer > Network > ZCDC01 > FinanceFiles (access denied)" },
          {
            type: "img",
            content: "/images/blog/zcdc02/21b-access-denied-finance.png",
            alt: "Windows File Explorer showing a Network Error dialog: Windows cannot access \\\\ZCDC01\\FinanceFiles, you do not have permission to access this location",
            caption: "21b. Access denied on FinanceFiles when logged in as a Design Staff user. NTFS permissions are working correctly.",
          },
          {
            type: "aside",
            content: "This is the AGdLP pattern: Accounts in Global groups, Global groups nested in Domain Local groups, Domain Local groups assigned Permissions. Adding a new Design user to Design Staff automatically grants them Modify access to DesignFiles without touching the share or its NTFS ACL.",
          },

        ],
      },

      // ── Group: Drive Maps ──────────────────────────────────────────────────
      {
        type: "group",
        content: "",
        title: "Drive Maps",
        children: [

          { type: "h3", content: "Tasks 28 and 29: GPO — Drive Maps" },
          { type: "note", content: "Map network drives automatically for staff based on their security group membership." },
          {
            type: "p",
            content:
              "I created ZC Drive Maps and linked it to the Staff OU. I added three drives: S: to \\\\ZCDC01\\DesignFiles for DL DesignFiles Modify members, F: to \\\\ZCDC01\\FinanceFiles for DL FinanceFiles Modify members, and P: to \\\\ZCDC01\\Public for everyone. Each used item-level targeting with a Security Group condition. The action on each was set to Replace so the drive is removed and re-created on each logon, keeping it consistent if a user changes groups.",
          },
          { type: "navpath", content: "GPM > zenithcreative.com > Staff > Linked Group Policy Objects" },
          {
            type: "img",
            content: "/images/blog/zcdc02/22a-staff-ou-drive-maps-added.png",
            alt: "Group Policy Management showing Staff OU with five linked GPOs: ZC Staff Screen Lock, ZC Staff Settings Control Panel Disable, ZC Wallpaper, ZC Design Printer, and ZC Drive Maps",
            caption: "22a. Staff OU now has five linked GPOs. ZC Drive Maps added at link order 5.",
          },
          { type: "navpath", content: "GPME > ZC Drive Maps > User Configuration > Preferences > Windows Settings > Drive Maps" },
          {
            type: "img",
            content: "/images/blog/zcdc02/22b-drive-maps-empty.png",
            alt: "Group Policy Management Editor Drive Maps section showing no items and a right-click context menu with New and Mapped Drive options visible",
            caption: "22b. Drive Maps section empty before setup. Right-click creates a new mapped drive entry.",
          },
          { type: "navpath", content: "GPME > ZC Drive Maps > Drive Maps > New Drive Properties > General" },
          {
            type: "img",
            content: "/images/blog/zcdc02/22c-new-s-drive.png",
            alt: "New Drive Properties General tab showing Action Update, Location \\\\ZCDC01\\DesignFiles, Label Design Files, and drive letter S assigned",
            caption: "22c. New drive: S: mapped to \\\\ZCDC01\\DesignFiles. Label: Design Files.",
          },
          { type: "navpath", content: "GPME > ZC Drive Maps > Drive Maps > New Drive Properties > Common" },
          {
            type: "img",
            content: "/images/blog/zcdc02/22d-drive-maps-common-targeting.png",
            alt: "New Drive Properties Common tab showing Item-level targeting checkbox ticked with the Targeting button available",
            caption: "22d. Item-level targeting enabled on the drive map. Only matching users receive this drive letter.",
          },
          { type: "navpath", content: "GPME > ZC Drive Maps > Drive Maps > Targeting Editor > New Item" },
          {
            type: "img",
            content: "/images/blog/zcdc02/22e-targeting-editor-security-group.png",
            alt: "Targeting Editor with New Item dropdown expanded showing targeting types with Security Group highlighted at the bottom of the list",
            caption: "22e. Targeting Editor: Security Group selected as the targeting type for this drive.",
          },
          { type: "navpath", content: "GPME > ZC Drive Maps > Drive Maps > Targeting Editor" },
          {
            type: "img",
            content: "/images/blog/zcdc02/22f-targeting-dl-designfiles.png",
            alt: "Targeting Editor showing the user is a member of the security group ZENITH\\DL DesignFiles Modify with the group SID confirmed",
            caption: "22f. Targeting confirmed: S: maps only for members of ZENITH\\DL DesignFiles Modify.",
          },
          { type: "navpath", content: "GPME > ZC Drive Maps > Drive Maps > Targeting Editor" },
          {
            type: "img",
            content: "/images/blog/zcdc02/22g-targeting-dl-financefiles.png",
            alt: "Targeting Editor showing the user is a member of the security group ZENITH\\DL FinanceFiles Modify with the group SID confirmed",
            caption: "22g. Targeting confirmed: F: maps only for members of ZENITH\\DL FinanceFiles Modify.",
          },
          { type: "navpath", content: "GPME > ZC Drive Maps > P: Drive Properties > Common > Targeting Editor" },
          {
            type: "img",
            content: "/images/blog/zcdc02/22h-targeting-domain-users.png",
            alt: "Targeting Editor showing the user is a member of the security group ZENITH\\Domain Users for the P drive mapping",
            caption: "22h. P: drive targeting: Domain Users maps the Public share for everyone on Staff, no group restriction.",
          },
          { type: "navpath", content: "GPME > ZC Drive Maps > User Configuration > Preferences > Windows Settings > Drive Maps" },
          {
            type: "img",
            content: "/images/blog/zcdc02/22i-drive-maps-configured.png",
            alt: "Group Policy Management Editor Drive Maps showing S drive to DesignFiles, F drive to FinanceFiles, and P drive to Public, all with action Replace",
            caption: "22i. ZC Drive Maps: S:, F:, and P: configured with item-level targeting per group. S: was set up first (shown in earlier screenshots). I repeated the same steps to add F: for DL FinanceFiles Modify members, and P: for everyone. P: has no security group condition so it maps for all Staff OU users regardless of department.",
          },
          { type: "navpath", content: "ZCPC01 > This PC (Design Staff drives after logon)" },
          {
            type: "img",
            content: "/images/blog/zcdc02/23a-drives-mapped-design.png",
            alt: "Windows 11 This PC showing Design Files S drive and Public P drive mapped as network locations",
            caption: "23a. Design Staff account: S: and P: mapped automatically at logon.",
          },
          { type: "navpath", content: "ZCPC01 > This PC (Finance Staff drives after logon)" },
          {
            type: "img",
            content: "/images/blog/zcdc02/23b-drives-mapped-finance.png",
            alt: "Windows 11 This PC showing Finance Files F drive and Public P drive mapped as network locations",
            caption: "23b. Finance Staff account: F: and P: mapped. S: absent because this user is not in DL DesignFiles Modify.",
          },

        ],
      },

      // ── Group: Remote Desktop ──────────────────────────────────────────────
      {
        type: "group",
        content: "",
        title: "Remote Desktop",
        children: [

          { type: "h3", content: "Task 30: Remote Desktop Access" },
          { type: "note", content: "Grant Chide Eze remote desktop access to the ZCPC01 workstation." },
          {
            type: "p",
            content:
              "I opened Settings on ZCPC01 and clicked Select users that can remotely access this PC. I added Chide Eze's account from zenithcreative.com. This adds the account to the local Remote Desktop Users group on that specific machine.",
          },
          {
            type: "aside",
            content: "Domain Admins can RDP to any domain computer by default. This grants the same access to a standard user on one specific workstation.",
          },
          { type: "label", content: "PowerShell equivalent:" },
          {
            type: "code",
            content:
              "Add-LocalGroupMember -Group \"Remote Desktop Users\" -Member \"ZENITH\\chide.eze\"\n  # run on ZCPC01, adds the user to the local Remote Desktop Users group\nGet-LocalGroupMember -Group \"Remote Desktop Users\"\n  # lists who currently has RDP access to this machine",
          },
          { type: "navpath", content: "ZCPC01 > Settings > System > Remote Desktop" },
          {
            type: "img",
            content: "/images/blog/zcdc02/24-remote-desktop.png",
            alt: "Windows 11 System Remote Desktop settings on ZCPC01 showing Select Users dialog with Chide Eze being added from zenithcreative.com",
            caption: "24. Chide Eze added to Remote Desktop Users on ZCPC01.",
          },

        ],
      },

    ],
  },

];
