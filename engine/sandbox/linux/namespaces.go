package linux

// NamespaceConfig controls which namespaces are enabled for a run.
type NamespaceConfig struct {
	PID     bool
	Mount   bool
	UTS     bool
	IPC     bool
	Network bool
	User    bool
}

func defaultNamespaceConfig(enableNet bool) NamespaceConfig {
	return NamespaceConfig{
		PID:     true,
		Mount:   true,
		UTS:     true,
		IPC:     true,
		Network: enableNet,
		User:    true,
	}
}
