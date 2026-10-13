export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: "Hardware" | "Software" | "Network" | "Guides";
  readTime: number;
  date: string;
  thumbnail?: string;
  tags?: string[];
  sections?: BlogSection[];
}

export interface BlogSection {
  type: "h2" | "h3" | "p" | "code" | "ul" | "note" | "img" | "label" | "qa" | "tasklist";
  content: string | string[];
  alt?: string;
  caption?: string;
  answer?: string;
  links?: Array<{ label: string; href: string }>;
}

export const posts: BlogPost[] = [
  {
    slug: "zcdc01-windows-domain-from-scratch",
    title: "Practical Assessment: Building a Windows Domain From Scratch",
    description: "Zenith Creative is a 15 person design studio in Lagos. They have just bought their first server and need a domain set up before staff start on Monday. You are the IT technician. Build it.",
    category: "Guides",
    readTime: 14,
    date: "2026-10-13",
    thumbnail: "/images/blog/zcdc01/07-ou-tree.png",
    tags: ["IT Support", "Active Directory", "Windows Server", "PowerShell", "Home Lab"],
    sections: [

      // ── Assessment Overview ───────────────────────────────────────────────
      { type: "h2", content: "Assessment Overview" },
      {
        type: "ul",
        content: [
          "Role: IT Support Technician (Windows Infrastructure)",
          "Format: Hands-on build, support tickets, evidence, verbal questions",
          "Lab: Windows Server 2025 VM in VirtualBox on a ROG Ally X, managed from a MacBook over Remote Desktop",
        ],
      },
      {
        type: "p",
        content:
          "Zenith Creative is a fictional 15-person design studio in Lagos that needs its first domain before staff start Monday. I am the IT technician.",
      },
      {
        type: "tasklist",
        content: "",
        links: [
          { label: "Tasks 1–3: Create the VM and Install Windows Server 2025", href: "#tasks-1-to-3-create-the-vm-and-install-windows-server-2025" },
          { label: "Task 4: Name the Server ZCDC01",                           href: "#task-4-name-the-server-zcdc01" },
          { label: "Task 5: Set the Lagos Time Zone",                          href: "#task-5-set-the-lagos-time-zone" },
          { label: "Task 6: Assign a Static IP Address",                       href: "#task-6-assign-a-static-ip-address" },
          { label: "Task 7: Create the Forest zenithcreative.com",             href: "#task-7-create-the-forest-zenithcreative-com" },
          { label: "Task 8: Resolve Internal and Internet Names",              href: "#task-8-resolve-internal-and-internet-names" },
          { label: "Tasks 9–10: Enable Remote Desktop and Confirm Connectivity", href: "#tasks-9-and-10-enable-remote-desktop-and-confirm-connectivity" },
          { label: "Task 11: Build the OU Structure",                          href: "#task-11-build-the-ou-structure" },
          { label: "Tasks 12–15: User Accounts and Personal Admin Account",   href: "#tasks-12-to-15-user-accounts-and-personal-admin-account" },
          { label: "Tasks 16–17: Security Groups",                             href: "#tasks-16-and-17-security-groups" },
          { label: "Ticket 1042",                                              href: "#ticket-1042" },
          { label: "Ticket 1043",                                              href: "#ticket-1043" },
          { label: "Ticket 1044",                                              href: "#ticket-1044" },
          { label: "Part C: Final Verification",                               href: "#part-c-final-verification" },
          { label: "Part D: Verbal Interview Questions",                       href: "#part-d-verbal-interview-questions" },
        ],
      },

      // ── Part A ────────────────────────────────────────────────────────────
      { type: "h2", content: "Part A: Build Tasks" },

      // Tasks 1–3
      {
        type: "h3",
        content: "Tasks 1 to 3: Create the VM and Install Windows Server 2025",
      },
      {
        type: "note",
        content:
          "Create a Windows Server 2025 virtual machine with 4 GB RAM, 2 CPUs, a 60 GB disk, EFI firmware, and a bridged network adapter. Install Windows Server 2025 Standard with Desktop Experience.",
      },
      {
        type: "p",
        content:
          "I created the VM in VirtualBox with 4 GB RAM, 2 CPUs, a 60 GB dynamically allocated disk, and EFI firmware enabled. I set the network adapter to bridged mode. Bridged networking places the server on the same physical network segment as my MacBook, so it receives a real IP address on the office subnet and can be managed remotely from any machine on that network. A NAT adapter would isolate it behind VirtualBox and make remote management impossible without extra port-forwarding rules. I attached the Windows Server 2025 ISO, booted the VM, selected Windows Server 2025 Standard Evaluation with Desktop Experience, accepted the licence, and chose the custom installation path. The installer completed without issues.",
      },

      // Task 4
      { type: "h3", content: "Task 4: Name the Server ZCDC01" },
      {
        type: "note",
        content: "Set the computer name to ZCDC01.",
      },
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
      {
        type: "img",
        content: "/images/blog/zcdc01/01-server-identity.png",
        alt: "Server Manager Local Server properties showing computer name ZCDC01 joined to zenithcreative.com with Ethernet IP 192.168.1.200",
        caption:
          "01. Server Manager confirming ZCDC01 as the computer name and zenithcreative.com as the domain.",
      },
      {
        type: "p",
        content:
          "A clear, consistent naming convention makes the server identifiable at a glance in any tool, from ADUC to network scanners. A generic name like WIN-A1B2C3 gives no useful information when reading logs.",
      },

      // Task 5
      { type: "h3", content: "Task 5: Set the Lagos Time Zone" },
      {
        type: "note",
        content: "Set the time zone to Lagos (UTC+01:00).",
      },
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
      {
        type: "img",
        content: "/images/blog/zcdc01/03-time-zone.png",
        alt: "Date and Time dialog on ZCDC01 showing UTC+01:00 West Central Africa time zone",
        caption: "03. Time zone set to UTC+01:00 West Central Africa.",
      },
      {
        type: "p",
        content:
          "Kerberos, the authentication protocol Active Directory relies on, rejects logins when the clock on a client differs from the domain controller by more than five minutes. Setting the correct time zone before promotion prevents that failure from affecting anyone on day one.",
      },

      // Task 6
      { type: "h3", content: "Task 6: Assign a Static IP Address" },
      {
        type: "note",
        content: "Assign a static IP address to the server NIC.",
      },
      {
        type: "p",
        content:
          "I opened the IPv4 properties for the Ethernet adapter and set the IP address to 192.168.1.200 with a 255.255.255.0 subnet mask and 192.168.1.1 as the default gateway. For the preferred DNS I entered 127.0.0.1, pointing to the loopback address. After the Active Directory promotion, the DNS service on this machine takes over and reconfigures the NIC to use itself as the resolver. Setting loopback at this stage avoids a chicken-and-egg problem during promotion.",
      },
      { type: "label", content: "PowerShell equivalent:" },
      {
        type: "code",
        content:
          "New-NetIPAddress -InterfaceAlias \"Ethernet\" -IPAddress 192.168.1.200 -PrefixLength 24 -DefaultGateway 192.168.1.1\n  # sets a fixed IP, a 255.255.255.0 subnet mask, and the router as gateway\nSet-DnsClientServerAddress -InterfaceAlias \"Ethernet\" -ServerAddresses 192.168.1.1\n  # temporary DNS before promotion; promotion later points the NIC at itself\nipconfig /all\n  # shows the full network configuration to verify it",
      },
      {
        type: "img",
        content: "/images/blog/zcdc01/02-ip-configuration.png",
        alt: "IPv4 Properties dialog showing static IP 192.168.1.200, subnet mask 255.255.255.0, default gateway 192.168.1.1, preferred DNS 127.0.0.1",
        caption:
          "02. Static IP 192.168.1.200 set on the Ethernet adapter. Preferred DNS is loopback, ready for the AD promotion.",
      },
      {
        type: "p",
        content:
          "Every machine on the network will use this server as its DNS resolver and Kerberos authentication endpoint. If the server's IP changed, clients could no longer find it and logins, domain joins, and name lookups would all fail. A static address makes its location fixed and predictable.",
      },

      // Task 7
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
        type: "p",
        content:
          "Installing the role and promoting the server are two distinct steps. Installing copies the AD DS binaries onto the machine. It adds the capability but changes nothing else. Promotion runs the actual configuration: it creates the AD database and SYSVOL folders, builds the DNS zone for zenithcreative.com, sets up Kerberos, and turns the server from a standalone Windows machine into a domain controller that can issue Kerberos tickets and authenticate users. A server with the role installed but not promoted cannot do any of that. The two-step design exists so administrators can stage the software before committing to the promotion.",
      },

      // Task 8
      { type: "h3", content: "Task 8: Resolve Internal and Internet Names" },
      {
        type: "note",
        content:
          "Confirm the DNS server resolves both internal company names and external internet names.",
      },
      {
        type: "p",
        content:
          "After the restart I opened PowerShell and tested both DNS paths. I pinged zenithcreative.com to confirm the domain controller answered for its own domain, and pinged google.com to confirm the forwarder was passing unknown names out through the router. Both resolved cleanly. The domain controller holds the authoritative DNS zone for zenithcreative.com and answers those queries itself. For any name it does not hold a record for, it forwards the query to 192.168.1.1. Without that forwarder every computer on the network would use this server as its only DNS resolver, meaning staff could authenticate and reach company resources but could not load any website or reach any external service.",
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
      {
        type: "img",
        content: "/images/blog/zcdc01/06-name-lookups.png",
        alt: "PowerShell on ZCDC01 showing ping to zenithcreative.com resolving to 192.168.1.200 and ping to google.com resolving to an external IP address",
        caption:
          "06. Internal name resolves to 192.168.1.200. External names forward through the router to the internet.",
      },
      {
        type: "p",
        content:
          "When the domain controller answers zenithcreative.com, the response is authoritative: it holds the record and answered directly from its own zone. When it answered google.com, the response was non-authoritative: it did not hold that record and forwarded the query upstream to get the answer.",
      },

      // Tasks 9–10
      {
        type: "h3",
        content: "Tasks 9 and 10: Enable Remote Desktop and Confirm Connectivity",
      },
      {
        type: "note",
        content:
          "Enable Remote Desktop on the server and confirm it can be reached and pinged from a remote workstation.",
      },
      {
        type: "p",
        content:
          "I enabled Remote Desktop early in the build so I could switch to managing the server from my Mac as quickly as possible. When I first tested network connectivity, the ping attempt failed. RDP on port 3389 was already working. That combination is useful diagnostic information: if RDP connects, the server is up and the network path is open. Ping failing alone means the Windows firewall is blocking ICMP, which is the default on Windows Server. It is not a server problem or a network problem. I enabled the built-in ICMPv4 Echo Request inbound rule and ping came back clean. I then ran all remaining tasks from the Mac through the RDP session.",
      },
      { type: "label", content: "Command I ran:" },
      {
        type: "code",
        content:
          "ping 192.168.1.200\n  # confirms the server replies to ICMP after the firewall rule was enabled",
      },
      { type: "label", content: "PowerShell equivalent:" },
      {
        type: "code",
        content:
          "Enable-NetFirewallRule -Name FPS-ICMP4-ERQ-In\n  # switches on the built-in rule allowing incoming ping, ICMPv4 Echo Request\nSet-ItemProperty -Path 'HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server' -Name \"fDenyTSConnections\" -Value 0\n  # turns Remote Desktop on via the registry\nEnable-NetFirewallRule -DisplayGroup \"Remote Desktop\"\n  # opens the Windows firewall for RDP connections",
      },
      {
        type: "img",
        content: "/images/blog/zcdc01/04-ping.png",
        alt: "Windows PowerShell on ZCDC01 showing successful ping to 192.168.1.200 with four replies and zero packet loss",
        caption:
          "04. Ping succeeds after enabling the ICMPv4 Echo Request inbound firewall rule.",
      },
      {
        type: "img",
        content: "/images/blog/zcdc01/05-rdp.png",
        alt: "Microsoft Remote Desktop on macOS with ZCDC01 Server Manager open inside an RDP session connected to 192.168.1.200",
        caption:
          "05. Server Manager open inside an RDP session from the MacBook. All remaining build work was done from here.",
      },

      // Task 11
      { type: "h3", content: "Task 11: Build the OU Structure" },
      {
        type: "note",
        content:
          "Create an Organisational Unit structure for IT Admins and departmental staff.",
      },
      {
        type: "p",
        content:
          "I opened Active Directory Users and Computers and created the following structure under the domain root. Users live in OUs rather than the default Users container because only OUs can receive Group Policy Objects and delegated control. The default container cannot.",
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
      {
        type: "img",
        content: "/images/blog/zcdc01/07-ou-tree.png",
        alt: "Active Directory Users and Computers showing the OU tree: IT Admins OU at domain level beside the Staff OU, which contains Design and Finance child OUs",
        caption: "07. OU tree: IT Admins sits at the same level as Staff, not inside it.",
      },
      {
        type: "img",
        content: "/images/blog/zcdc01/08-design-ou.png",
        alt: "Design OU in ADUC containing user Chide Eze and security group Design Staff",
        caption: "08. Design OU containing one user account and the Design Staff security group.",
      },
      {
        type: "img",
        content: "/images/blog/zcdc01/09-finance-ou.png",
        alt: "Finance OU in ADUC containing users Funmi Adebayo and Kemi Johnson alongside the Finance Staff security group",
        caption: "09. Finance OU containing two user accounts and the Finance Staff security group.",
      },
      {
        type: "img",
        content: "/images/blog/zcdc01/10-it-admin-ou.png",
        alt: "IT Admins OU in ADUC containing a single user named Abiola",
        caption: "10. IT Admins OU: the personal admin account sits here, separate from all staff OUs.",
      },
      {
        type: "p",
        content:
          "A distinguished name is the full path to an object in the directory. It reads right to left: DC=com is the top-level domain component, DC=zenithcreative is the domain name, OU=Zenith is the first organisational unit, and so on down to the object. IT Admins sits beside Staff rather than inside it because any Group Policy linked to the Staff OU, such as desktop restrictions or software deployment rules, must never apply to admin accounts. Structural separation makes that guarantee permanent. If IT Admins were inside Staff, every staff policy would apply to admin accounts by default and would have to be blocked with exceptions, which is fragile.",
      },

      // Tasks 12–15
      {
        type: "h3",
        content: "Tasks 12 to 15: User Accounts and Personal Admin Account",
      },
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

      // Tasks 16–17
      { type: "h3", content: "Tasks 16 and 17: Security Groups" },
      {
        type: "note",
        content:
          "Create security groups for Design Staff and Finance Staff, and add the appropriate user accounts.",
      },
      {
        type: "p",
        content:
          "I created a Design Staff security group inside the Design OU and added ceze. I created a Finance Staff security group inside the Finance OU and added fadebayo. Permissions are assigned to the groups, not to individual user accounts. Adding or removing someone from a group is the only action needed to grant or revoke access. Onboarding and offboarding both become a single operation.",
      },
      { type: "label", content: "PowerShell equivalent:" },
      {
        type: "code",
        content:
          "New-ADGroup -Name \"Design Staff\" -GroupScope Global -GroupCategory Security -Path \"OU=Design,OU=Staff,OU=Zenith,DC=zenithcreative,DC=com\"\n  # creates a security group in the Design OU\nAdd-ADGroupMember -Identity \"Design Staff\" -Members ceze\n  # adds a user to the group\nGet-ADGroupMember -Identity \"Design Staff\"\n  # lists the group's current members\nGet-ADPrincipalGroupMembership -Identity adm.abiola | Select-Object Name\n  # lists every group an account belongs to",
      },
      {
        type: "img",
        content: "/images/blog/zcdc01/11-design-staff-members.png",
        alt: "Design Staff security group Properties Members tab showing Chide Eze as a member from zenithcreative.com/Staff/Design",
        caption: "11. Design Staff group: Chide Eze is the sole member.",
      },
      {
        type: "img",
        content: "/images/blog/zcdc01/12-finance-staff-members.png",
        alt: "Finance Staff security group Properties Members tab showing Funmi Adebayo and Kemi Johnson from zenithcreative.com/Staff/Finance",
        caption: "12. Finance Staff group: both Finance users are members.",
      },
      {
        type: "img",
        content: "/images/blog/zcdc01/13-admin-group-memberships.png",
        alt: "adm.abiola user Properties Member Of tab showing Domain Admins and Domain Users group memberships",
        caption: "13. adm.abiola is a member of Domain Admins. A named personal account, not the shared built-in Administrator.",
      },

      // ── Part B ────────────────────────────────────────────────────────────
      { type: "h2", content: "Part B: Support Tickets" },

      // Ticket 1042
      { type: "h3", content: "Ticket 1042" },
      {
        type: "note",
        content: "\"Hi IT, I'm Chidi. I forgot my password and I can't log in.\"",
      },
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
      {
        type: "img",
        content: "/images/blog/zcdc01/14-ticket-1042.png",
        alt: "Reset Password dialog for a user in the Design OU with empty new password fields and User must change password at next logon checked",
        caption: "14. Ticket 1042: password reset with forced change at next logon.",
      },
      { type: "label", content: "Why this approach:" },
      {
        type: "p",
        content:
          "Admins can reset passwords but can never read them. Windows stores only a hash of each password, not the value itself. There is no way to retrieve the original, only to replace it. The forced change at next logon means the admin never knows the user's actual working password.",
      },

      // Ticket 1043
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
      {
        type: "img",
        content: "/images/blog/zcdc01/15-ticket-1043.png",
        alt: "ADUC right-click context menu on Funmi Adebayo with Enable Account highlighted, confirming the account is currently disabled",
        caption:
          "15. Ticket 1043: Funmi's account disabled. Enable Account in the context menu confirms it is currently off.",
      },
      { type: "label", content: "Why this approach:" },
      {
        type: "p",
        content:
          "Deleting the account destroys its Security Identifier. A recreated account gets a new SID, which means every group membership and every file permission that referenced the original SID is permanently gone. IT would have to rebuild her access by hand when she returns. Disabling preserves everything. One click re-enables the account and she continues exactly where she left off.",
      },

      // Ticket 1044
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
      {
        type: "img",
        content: "/images/blog/zcdc01/16-ticket-1044.png",
        alt: "Kemi Johnson Properties Member Of tab showing Finance Staff and Domain Users group memberships",
        caption:
          "16. Ticket 1044: Kemi Johnson added to Finance Staff. Group membership grants her identical access to Funmi's in one step.",
      },
      { type: "label", content: "Why this approach:" },
      {
        type: "p",
        content:
          "Access is on the group, not the individual. Matching Funmi's groups gives Kemi the correct permissions in a single addition. There are no individual permission entries to audit or miss.",
      },

      // ── Part C ────────────────────────────────────────────────────────────
      { type: "h2", content: "Part C: Final Verification" },
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
      { type: "label", content: "PowerShell equivalent:" },
      {
        type: "code",
        content: "whoami /groups\n  # lists every group the current account belongs to",
      },
      {
        type: "img",
        content: "/images/blog/zcdc01/17-logged-in-as-admin.png",
        alt: "Windows PowerShell terminal showing whoami returning zenith\\adm.abiola",
        caption: "17. All admin work done as zenith\\adm.abiola, confirmed with whoami.",
      },
      {
        type: "p",
        content:
          "Using adm.abiola rather than the built-in Administrator account matters for two reasons. Every action in the domain event log is attributed to a specific person, not to a shared account that anyone with the password could be. The built-in Administrator is also a known target: it exists in every domain by default, its name is predictable, and attackers probe it first. A named personal admin account provides accountability and reduces that surface.",
      },

      // ── Part D ────────────────────────────────────────────────────────────
      { type: "h2", content: "Part D: Verbal Interview Questions" },

      {
        type: "qa",
        content: "Question 1: Walk me through what you did, from empty VM to working domain.",
        answer: "I confirmed 192.168.1.200 was free, checked virtualisation was enabled, then created the VM with 4 GB RAM, 2 CPUs, a 60 GB disk, EFI, and a bridged adapter so it sits on the office network. I installed Windows Server 2025 with Desktop Experience, set the Lagos time zone, renamed it ZCDC01, and gave it a static IP of 192.168.1.200 with the router as gateway. I enabled Remote Desktop and allowed ICMP through the firewall so it could be reached and pinged from my workstation. I then installed AD DS and promoted it to a new forest, zenithcreative.com, NetBIOS name ZENITH, with DNS, and set a DSRM password. After the restart I verified the domain, confirmed DNS resolved internal and internet names through the forwarder, then built the OU structure, users, groups, and a personal admin account.",
      },

      {
        type: "qa",
        content: "Question 2: What is the difference between installing AD DS and promoting a server?",
        answer: "Installing AD DS only adds the software to the server. Promoting runs the configuration that creates the forest and domain, builds the AD database, sets up DNS, and turns the server into a domain controller that can authenticate users. Installing is buying the kitchen equipment. Promoting is opening the restaurant.",
      },

      {
        type: "qa",
        content: "Question 3: Why does a domain controller need a static IP?",
        answer: "Every computer in the domain points to the domain controller for DNS and authentication. If its IP changed, clients could no longer find it, so logins, domain joins, and name lookups would all fail. A static IP keeps it in one known place.",
      },

      {
        type: "qa",
        content: "Question 4: A user says their password is correct but they cannot log in to the domain. Name three things you would check, in order.",
        answer: "First, the account in Active Directory: is it locked out, disabled, or is the password expired? Second, connectivity: can the computer reach the domain controller, and is its DNS pointing to it? Third, time: if the clocks differ by more than five minutes, Kerberos rejects the login.",
      },

      {
        type: "qa",
        content: "Question 5: Why did you create a personal admin account instead of using Administrator?",
        answer: "Every admin action is tied to me personally, which gives a clear audit trail. The built-in Administrator exists in every domain, so attackers target it first, and if it is shared between multiple people, nobody knows who did what. Personal admin accounts can also be removed when someone leaves without affecting anything else in the domain.",
      },

      {
        type: "qa",
        content: "Question 6: Why did you put users in OUs instead of the default Users container?",
        answer: "Group Policy can be linked to OUs but not to the default Users container. OUs also allow delegated control, for example letting a team lead reset passwords only in their own department OU. They also keep the directory organised as it grows.",
      },

      {
        type: "qa",
        content: "Question 7: Your server cannot be pinged, but RDP works. What does that tell you?",
        answer: "The server is up and the network path is open, because Remote Desktop on port 3389 is connecting. Ping failing means the firewall is blocking ICMP, which is the default on Windows Server. It is a firewall configuration issue, not a network or server problem. I enabled it with Enable-NetFirewallRule -Name FPS-ICMP4-ERQ-In.",
      },

      {
        type: "qa",
        content: "Question 8: What is DNS forwarding, and why did this server need it?",
        answer: "DNS forwarding sends any lookup the domain controller cannot answer itself, such as google.com, to another DNS server, here the router at 192.168.1.1. The domain controller answers company names directly from its own zone. Because every computer on the network uses it as its only DNS server, without a forwarder staff could authenticate and reach internal resources but could not reach the internet.",
      },

      {
        type: "qa",
        content: "Question 9: A staff member's computer will not join the domain. What is the first thing you check?",
        answer: "DNS. Is the computer's DNS server set to the domain controller, and does nslookup of the domain name succeed? Without that, the computer cannot locate the domain at all. After DNS I check network connectivity to the DC, then the Windows edition (Home editions cannot join a domain), and whether the account being used has permission to join computers.",
      },

      {
        type: "qa",
        content: "Question 10: Ticket 1043: why disable rather than delete? What would happen if you deleted the account?",
        answer: "Disabling blocks access but keeps the account exactly as it is. Deleting removes its Security Identifier. Recreating the account later would produce a new SID, which means every group membership and every permission tied to the original SID is gone permanently. IT would have to rebuild her access from scratch. Disabling preserves all of that so re-enabling it on return is a single click.",
      },

      // ── Skills ────────────────────────────────────────────────────────────
      { type: "h2", content: "Skills Demonstrated" },
      {
        type: "ul",
        content: [
          "Windows Server 2025 | Tasks 1 to 3: VM creation and OS installation",
          "Active Directory Domain Services | Task 7: new forest and domain controller promotion",
          "DNS and forwarding | Task 8: internal resolution and internet forwarding",
          "Static IP configuration | Task 6: server NIC configuration",
          "Windows Firewall | Tasks 9 and 10: ICMP and RDP inbound rules",
          "Remote Desktop | Tasks 9 and 10: managing a Windows server from macOS",
          "PowerShell | Commands throughout: AD management, verification, troubleshooting",
          "OU design | Task 11: structural separation of admin and staff accounts",
          "Security groups | Tasks 16 and 17: group-based access control",
          "Least privilege | Personal admin account adm.abiola, not the built-in Administrator",
          "Ticket handling | Password reset, account disable for leave, new hire onboarding",
          "Troubleshooting | Ping vs RDP diagnosis: isolating a firewall rule from a connectivity fault",
        ],
      },

    ],
  },

];
