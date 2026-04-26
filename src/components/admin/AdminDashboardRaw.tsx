      {/* ─── ADMIN LOGIN DIALOG ─── */}
      <Dialog open={isAdminOpen && !isLoggedIn} onOpenChange={(open) => { if (!open) setIsAdminOpen(false) }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="size-5" style={{ color: '#0D9488' }} />
              Admin Login
            </DialogTitle>
            <DialogDescription>Enter your credentials to access the admin dashboard.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-lg">
                {loginError}
              </div>
            )}
            <div>
              <Label htmlFor="admin-email" className="text-sm font-medium text-gray-700 mb-1 block">Email</Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@hayatlifecare.com"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAdminLogin() }}
              />
            </div>
            <div>
              <Label htmlFor="admin-password" className="text-sm font-medium text-gray-700 mb-1 block">Password</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Enter password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAdminLogin() }}
              />
            </div>
            <Button
              onClick={handleAdminLogin}
              disabled={isLoginLoading}
              className="w-full text-white font-semibold"
              style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
            >
              {isLoginLoading ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              {isLoginLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ─── ADMIN DASHBOARD FULL-SCREEN OVERLAY ─── */}
      <AnimatePresence>
        {isAdminOpen && isLoggedIn && (
          <motion.div
            key="admin-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] bg-white overflow-hidden"
          >
            {/* Admin Header */}
            <div className="h-14 flex items-center justify-between px-6 text-white" style={{ background: '#0F172A' }}>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                  <Building2 className="size-4 text-white" />
                </div>
                <span className="font-bold text-lg">Hayat Life Care Admin</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400 hidden sm:block">admin@hayatlifecare.com</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setIsAdminOpen(false); setIsLoggedIn(false); setAdminEmail(''); setAdminPassword('') }}
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <LogOut className="size-4 mr-1" /> Exit
                </Button>
                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close Admin"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            <div className="flex" style={{ height: 'calc(100vh - 56px)' }}>
              {/* Sidebar */}
              <div className="w-56 shrink-0 border-r bg-gray-50 overflow-y-auto hidden md:block">
                <nav className="p-3 space-y-1">
                  {[
                    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                    { id: 'inquiries', icon: Inbox, label: 'Inquiries' },
                    { id: 'services', icon: Wrench, label: 'Services' },
                    { id: 'faqs', icon: HelpCircle, label: 'FAQs' },
                    { id: 'leaders', icon: UserPlus, label: 'Leaders' },
                    { id: 'settings', icon: Settings, label: 'Settings' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setAdminTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        adminTab === tab.id
                          ? 'text-white shadow-sm'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      style={adminTab === tab.id ? { background: 'linear-gradient(135deg, #0D9488, #10B981)' } : {}}
                    >
                      <tab.icon className="size-4" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Mobile tab bar */}
              <div className="md:hidden absolute bottom-0 left-0 right-0 border-t bg-white flex overflow-x-auto z-10">
                {[
                  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                  { id: 'inquiries', icon: Inbox, label: 'Inquiries' },
                  { id: 'services', icon: Wrench, label: 'Services' },
                  { id: 'faqs', icon: HelpCircle, label: 'FAQs' },
                  { id: 'leaders', icon: UserPlus, label: 'Leaders' },
                  { id: 'settings', icon: Settings, label: 'Settings' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setAdminTab(tab.id)}
                    className={`flex-1 flex flex-col items-center gap-1 px-2 py-2 text-[10px] font-medium min-w-[60px] ${
                      adminTab === tab.id ? 'text-teal-600' : 'text-gray-400'
                    }`}
                  >
                    <tab.icon className="size-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 pb-20 md:pb-6">
                {/* ── Dashboard Tab ── */}
                {adminTab === 'dashboard' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      <div className="bg-white rounded-xl border p-5 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Total Inquiries</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{inquiries.length}</div>
                        <div className="flex gap-2 mt-2">
                          <Badge className="bg-red-100 text-red-700 border-0 text-[10px]">New: {inquiries.filter(i => i.status === 'new').length}</Badge>
                          <Badge className="bg-yellow-100 text-yellow-700 border-0 text-[10px]">Read: {inquiries.filter(i => i.status === 'read').length}</Badge>
                          <Badge className="bg-green-100 text-green-700 border-0 text-[10px]">Replied: {inquiries.filter(i => i.status === 'replied').length}</Badge>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border p-5 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Total Services</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{adminServices.length}</div>
                        <div className="text-xs text-teal-600 mt-2">{adminServices.filter(s => s.active).length} active</div>
                      </div>
                      <div className="bg-white rounded-xl border p-5 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Total FAQs</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{adminFaqs.length}</div>
                        <div className="text-xs text-teal-600 mt-2">{adminFaqs.filter(f => f.active).length} active</div>
                      </div>
                      <div className="bg-white rounded-xl border p-5 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Leaders</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{leaders.length}</div>
                        <div className="text-xs text-teal-600 mt-2">Team members</div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Inquiries</h3>
                    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Subject</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {inquiries.slice(0, 5).map((inq) => (
                              <tr key={inq.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium">{inq.name}</td>
                                <td className="px-4 py-3 text-gray-600">{inq.subject || '—'}</td>
                                <td className="px-4 py-3">
                                  <Badge className={`border-0 text-[10px] ${
                                    inq.status === 'new' ? 'bg-red-100 text-red-700' :
                                    inq.status === 'read' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {inq.status}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 text-gray-500">{new Date(inq.createdAt).toLocaleDateString()}</td>
                              </tr>
                            ))}
                            {inquiries.length === 0 && (
                              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No inquiries yet</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Inquiries Tab ── */}
                {adminTab === 'inquiries' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">All Inquiries</h2>
                    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Phone</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Subject</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {inquiries.map((inq) => (
                              <tr key={inq.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium">{inq.name}</td>
                                <td className="px-4 py-3 text-gray-600">{inq.phone}</td>
                                <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{inq.subject || '—'}</td>
                                <td className="px-4 py-3">
                                  <Select value={inq.status} onValueChange={(val) => updateInquiryStatus(inq.id, val)}>
                                    <SelectTrigger className="w-28 h-7 text-xs">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="new">New</SelectItem>
                                      <SelectItem value="read">Read</SelectItem>
                                      <SelectItem value="replied">Replied</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </td>
                                <td className="px-4 py-3 text-gray-500 text-xs">{new Date(inq.createdAt).toLocaleDateString()}</td>
                              </tr>
                            ))}
                            {inquiries.length === 0 && (
                              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No inquiries yet</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Services Tab ── */}
                {adminTab === 'services' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Services</h2>

                    {/* Add Service Form */}
                    <div className="bg-white rounded-xl border shadow-sm p-5 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Plus className="size-4" style={{ color: '#0D9488' }} /> Add New Service
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <Input placeholder="Title" value={newService.title} onChange={(e) => setNewService(p => ({ ...p, title: e.target.value }))} />
                        <Input placeholder="Slug (e.g. car-parking)" value={newService.slug} onChange={(e) => setNewService(p => ({ ...p, slug: e.target.value }))} />
                        <Input placeholder="Icon name" value={newService.icon} onChange={(e) => setNewService(p => ({ ...p, icon: e.target.value }))} />
                        <Input placeholder="Floor" value={newService.floor} onChange={(e) => setNewService(p => ({ ...p, floor: e.target.value }))} />
                        <Input placeholder="Category" value={newService.category} onChange={(e) => setNewService(p => ({ ...p, category: e.target.value }))} />
                        <div className="sm:col-span-2">
                          <Input placeholder="Description" value={newService.description} onChange={(e) => setNewService(p => ({ ...p, description: e.target.value }))} />
                        </div>
                      </div>
                      <Button onClick={addService} className="mt-3 text-white" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }} size="sm">
                        <Plus className="size-4 mr-1" /> Add Service
                      </Button>
                    </div>

                    {/* Services List */}
                    <div className="space-y-3">
                      {adminServices.map((svc) => (
                        <div key={svc.id} className="bg-white rounded-xl border shadow-sm p-4 flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 dark:text-white">{svc.title}</div>
                            <div className="text-sm text-gray-500 truncate">{svc.description}</div>
                            <div className="flex gap-2 mt-1">
                              {svc.floor && <Badge className="border-0 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-[10px]">{svc.floor}</Badge>}
                              {svc.category && <Badge className="border-0 bg-gray-100 text-gray-600 text-[10px]">{svc.category}</Badge>}
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => deleteService(svc.id)} className="text-gray-400 hover:text-red-500 shrink-0">
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      ))}
                      {adminServices.length === 0 && (
                        <div className="text-center py-8 text-gray-400">No services found</div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── FAQs Tab ── */}
                {adminTab === 'faqs' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage FAQs</h2>

                    {/* Add FAQ Form */}
                    <div className="bg-white rounded-xl border shadow-sm p-5 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Plus className="size-4" style={{ color: '#0D9488' }} /> Add New FAQ
                      </h3>
                      <div className="space-y-3">
                        <Input placeholder="Question" value={newFaq.question} onChange={(e) => setNewFaq(p => ({ ...p, question: e.target.value }))} />
                        <Textarea placeholder="Answer" value={newFaq.answer} onChange={(e) => setNewFaq(p => ({ ...p, answer: e.target.value }))} className="min-h-[80px]" />
                        <div className="flex gap-3 items-center">
                          <Input placeholder="Category" value={newFaq.category} onChange={(e) => setNewFaq(p => ({ ...p, category: e.target.value }))} className="max-w-[200px]" />
                          <Button onClick={addFaq} className="text-white" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }} size="sm">
                            <Plus className="size-4 mr-1" /> Add FAQ
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* FAQs List */}
                    <div className="space-y-3">
                      {adminFaqs.map((faq) => (
                        <div key={faq.id} className="bg-white rounded-xl border shadow-sm p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-gray-900 text-sm">{faq.question}</div>
                              <div className="text-sm text-gray-500 mt-1 line-clamp-2">{faq.answer}</div>
                              <Badge className="border-0 bg-gray-100 text-gray-600 text-[10px] mt-2">{faq.category}</Badge>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => deleteFaq(faq.id)} className="text-gray-400 hover:text-red-500 shrink-0">
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {adminFaqs.length === 0 && (
                        <div className="text-center py-8 text-gray-400">No FAQs found</div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Leaders Tab ── */}
                {adminTab === 'leaders' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Leaders</h2>

                    {/* Add Leader Form */}
                    <div className="bg-white rounded-xl border shadow-sm p-5 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Plus className="size-4" style={{ color: '#0D9488' }} /> Add New Leader
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <Input placeholder="Name" value={newLeader.name} onChange={(e) => setNewLeader(p => ({ ...p, name: e.target.value }))} />
                        <Input placeholder="Designation" value={newLeader.designation} onChange={(e) => setNewLeader(p => ({ ...p, designation: e.target.value }))} />
                      </div>
                      <Textarea placeholder="Bio" value={newLeader.bio} onChange={(e) => setNewLeader(p => ({ ...p, bio: e.target.value }))} className="mt-3 min-h-[80px]" />
                      <Button onClick={addLeader} className="mt-3 text-white" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }} size="sm">
                        <Plus className="size-4 mr-1" /> Add Leader
                      </Button>
                    </div>

                    {/* Leaders List */}
                    <div className="space-y-3">
                      {leaders.map((ldr) => (
                        <div key={ldr.id} className="bg-white rounded-xl border shadow-sm p-4 flex items-start gap-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full shrink-0 text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                            {ldr.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 dark:text-white">{ldr.name}</div>
                            <div className="text-sm" style={{ color: '#0D9488' }}>{ldr.designation}</div>
                            <div className="text-sm text-gray-500 mt-1 line-clamp-2">{ldr.bio}</div>
                          </div>
                        </div>
                      ))}
                      {leaders.length === 0 && (
                        <div className="text-center py-8 text-gray-400">No leaders found</div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Settings Tab ── */}
                {adminTab === 'settings' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Site Settings</h2>
                    <div className="space-y-6">
                      {Object.entries(siteSettings).map(([group, settings]) => (
                        <div key={group} className="bg-white rounded-xl border shadow-sm p-5">
                          <h3 className="font-semibold text-gray-900 mb-4 capitalize flex items-center gap-2">
                            {group === 'general' && <Building2 className="size-4" style={{ color: '#0D9488' }} />}
                            {group === 'contact' && <Phone className="size-4" style={{ color: '#0D9488' }} />}
                            {group === 'social' && <Users className="size-4" style={{ color: '#0D9488' }} />}
                            {group === 'investment' && <TrendingUp className="size-4" style={{ color: '#0D9488' }} />}
                            {group} Settings
                          </h3>
                          <div className="space-y-3">
                            {(settings as any[]).map((s: any) => (
                              <div key={s.id || s.key}>
                                <Label className="text-xs text-gray-500 mb-1 block">{s.label || s.key}</Label>
                                <Input
                                  value={s.value}
                                  onChange={(e) => {
                                    setSiteSettings(prev => ({
                                      ...prev,
                                      [group]: (prev[group] || []).map((item: any) =>
                                        item.key === s.key ? { ...item, value: e.target.value } : item
                                      ),
                                    }))
                                  }}
                                  className="text-sm"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <Button
                        onClick={saveSettings}
                        className="text-white font-semibold"
                        style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                      >
                        <Settings className="size-4 mr-2" /> Save All Settings
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Quick Contact Bar */}
      <AnimatePresence>
        {showMobileBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <a href="tel:01332-850348" className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold" style={{ background: '#0D9488' }}>
                <Phone className="size-4" /> Call Now
              </a>
              <a href="https://wa.me/8801617977232" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold" style={{ background: '#25D366' }}>
                <MessageSquare className="size-4" /> WhatsApp
              </a>
              <a href="#contact" className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold" style={{ background: '#D97706' }}>
                <Mail className="size-4" /> Enquiry
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
